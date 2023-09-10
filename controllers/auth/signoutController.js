export default (req, res, next) => {
    try {
        return res.status(200).json({ success: true, message: "LOGOUT_SUCCESS" });
    } catch (error) {
        next(error);
    }
};
