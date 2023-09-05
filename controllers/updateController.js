export default (model) => async (req, res, next) => {
    try {
        console.log(req.body)
        let updatedData = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) throw new Error("not found");
        console.log(updatedData);
        return res.status(200).json({
            success: true,
            message: "updated",
            response: updatedData,
        });
    } catch (error) {
        next(error);
    }
};
