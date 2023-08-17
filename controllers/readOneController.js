export default (model) => async (req, res, next) => {
    try {
        let data = await model.findOne({ _id: req.params.id });
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
