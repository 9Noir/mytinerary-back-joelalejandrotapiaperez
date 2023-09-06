import User from "../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.findOne({ mail: req.body.mail });
        if (user) return res.status(400).json({ success: false, message: "Email already registered" });
        return next();
    } catch (error) {
        next(error);
    }
};
