import User from "../models/User.js";

export default (step1) => async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }, "-password -__v -createdAt -updatedAt");
        if (!user) return res.status(404).json({ success: false, message: "ERROR_EMAIL_NOT_REGISTERED" });
        if (step1) return res.status(200).json({ success: true, message: "EMAIL_FOUND", photo: user.photo, role: user.role });
        req.user = user;
        return next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
