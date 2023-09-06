import User from "../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }, "-password -__v -createdAt -updatedAt");
        if (!user) return res.status(404).json({ success: false, message: "Email not registered" });
        req.user = user;
        return next();
    } catch (error) {
        next(error);
    }
};
