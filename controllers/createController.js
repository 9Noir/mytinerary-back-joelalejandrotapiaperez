export default (model) => async (req, res, next) => {
    try {
        let newData = await model.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Created",
            response: newData._id,
        });
    } catch (error) {
        next(error);
    }
};
