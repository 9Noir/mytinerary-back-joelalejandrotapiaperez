export default (model) => async (req, res, next) => {
    try {
        let newData = await model.create(req.body);
        console.log(newData)
        return res.status(201).json({
            success: true,
            message: "Created",
            response: newData,
        });
    } catch (error) {
        next(error);
    }
};
