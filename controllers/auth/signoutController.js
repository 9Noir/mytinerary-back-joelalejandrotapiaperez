export default (req, res, next) => {
    try {
        return res.status(200).json({ succes: true, message: "User logout" });
    } catch (error) {
        next(error);
    }
};
