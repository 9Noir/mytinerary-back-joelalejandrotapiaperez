import User from "../models/User.js";

export default (step1) => async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ success: false, message: "EMAIL_EXISTS" });
        if (step1) return res.status(200).json({ success: true, message: "EMAIL_AND_PASSWORD_VALIDATED" });
        return next();
    } catch (error) {
        next(error);
    }
};
