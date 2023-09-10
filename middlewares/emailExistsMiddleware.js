import User from "../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ success: false, message: "EMAIL_EXISTS" });
        return next();
    } catch (error) {
        next(error);
    }
};
