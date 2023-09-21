import User from "../../models/User.js";

export default async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ email: req.user.email }, req.body, { new: true }).select("-__v -createdAt -updatedAt -password");
        console.log(updatedUser);
        return res.status(201).json({
            success: true,
            message: "USER_UPDATE_SUCCESS",
            response: { token: req.token, user: updatedUser },
        });
    } catch (error) {
        next(error);
    }
};
