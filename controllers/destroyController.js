export default (model) => async (req, res, next) => {
    try {
        let deletedData = await model.findOneAndDelete({ _id: req.params.id });
        if (!deletedData) throw new Error("not found");

        return res.status(200).json({
            success: true,
            message: "Deleted",
            response: deletedData,
        });
    } catch (error) {
        next(error);
    }
};
