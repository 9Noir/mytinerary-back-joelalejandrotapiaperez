export default (model) => async (req, res, next) => {
    try {
        const attributes = Object.keys(model.schema.paths);
        const query = {};
        let sort = {};

        const fillParams =
            {
                cities: { populate: { path: "admin_id", select: "photo name mail -_id" } },
                itineraries: { populate: { path: "city_id", select: "city -_id" } },
                // activities: { populate: { path: "itinerary_id", select: "name -_id" } },
            }[model.modelName] || "";

        if (req.query.sort) {
            sort = { [req.query.sort]: req.query.order === "DESC" ? -1 : 1 };
        }

        for (const field in req.query) {
            if (attributes.includes(field)) {
                // Verificar si el campo es de tipo String en el esquema
                if (model.schema.paths[field].instance === "String") {
                    query[field] = new RegExp((model.modelName=="cities"?'^':"")+req.query[field], "i");
                    console.log(query[field])
                } else {
                    query[field] = req.query[field];
                }
            }
        }

        const data = await model.find(query).sort(sort).populate(fillParams.populate);
        return res.status(200).json({
            success: true,
            message: "Found",
            response: data,
        });
    } catch (error) {
        next(error);
    }
};
