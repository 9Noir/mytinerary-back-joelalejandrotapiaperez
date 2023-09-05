import queryHelpers from "./queryHelpers.js";

export default (model) => async (req, res, next) => {
    try {
        const { populate } = queryHelpers(model.modelName);

        let data = await model.findOne({ _id: req.params.id }).populate(populate);
        if (!data) throw new Error("not found");

        return res.status(200).json({
            success: true,
            message: "found",
            response: data,
        });
    } catch (error) {
        next(error);
    }
};
