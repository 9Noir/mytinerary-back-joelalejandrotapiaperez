export default (model) => async (req, res, next) => {
    try {
        const attributes = Object.keys(model.schema.paths);
        let { sort, order, limit, distinct, skip, ...query } = req.query;

        const modelQueries =
            {
                cities: { populate: { path: "admin_id", select: "photo name mail -_id" } },
                itineraries: { populate: { path: "city_id", select: "city -_id" },populate2: { path: "creator" ,select:"name lastName photo -_id"},populate3:{path:"comments"},populate4:{path:"comments",populate:{path:"user"}}  },
                activities: { populate: { path: "itinerary_id", select: "name -_id" } },
                users: { select: "-_id -password" },
            }[model.modelName] || "";

        for (const field in query) {
            if (attributes.includes(field)) {
                // Verificar si el campo es de tipo String en el esquema
                if (model.schema.paths[field].instance === "String") {
                    query[field] = new RegExp(req.query[field], "i");
                } else {
                    query[field] = query[field];
                }
            }
        }

        const data = distinct
            ? await model.distinct(distinct) //Para traer los valores no repetidos de un atributo del modelo. Ej traer todos los tags no repetidos de itineraries
            : await model
                  .find(query)
                  .sort({ [sort]: order })
                  .populate(modelQueries.populate)
                  .populate(modelQueries.populate2)
                  .populate(modelQueries.populate3)
                  .populate(modelQueries.populate4)
                  .select(modelQueries.select)
                  .skip(skip)
                  .limit(limit);
        // const data = await model.find({ tags: { $in: ["#beach", "#nature"] } });
        // if (!data.length) return res.status(204).json({message:"Not found"});
        if (!data.length) return res.status(404).json({ message: "Not found" });
        // return res.json(data);
        return res.status(200).json({
            success: true,
            message: "Found",
            response: data,
        });
    } catch (error) {
        next(error);
    }
};
