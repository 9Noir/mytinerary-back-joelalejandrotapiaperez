import User from "../../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        console.log(user)
        return res.status(201).json({
            succes: true,
            message: "User created",
            response: user,
        });
    } catch (error) {
        next(error);
    }
};
