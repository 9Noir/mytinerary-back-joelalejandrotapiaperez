import User from "../../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        console.log(user);
        return res.status(201).json({
            success: true,
            message: "REGISTER_SUCCESS",
        });
    } catch (error) {
        next(error);
    }
};
