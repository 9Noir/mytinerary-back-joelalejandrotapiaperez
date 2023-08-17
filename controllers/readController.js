export default (model) => async (req, res, next) => {
    try {
        const attributes = Object.keys(model.schema.paths);
        const query = {};
        let sort = {};

        if (req.query.sort) {
            sort = { [req.query.sort]: req.query.order === "DESC" ? -1 : 1 };
        }

        for (const field in req.query) {
            if (attributes.includes(field)) {
                query[field] = new RegExp(req.query[field], "i");
            }
        }

        // const data = await model.find(query).populate("admin_id", "photo name mail -_id").sort(sort);
        const data = await model.find(query).sort(sort);
        return res.status(200).json({
            success: true,
            message: "Found",
            response: data,
        });
    } catch (error) {
        next(error);
    }
};
