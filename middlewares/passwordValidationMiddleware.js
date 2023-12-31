import { compareSync } from "bcrypt";
import User from "../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const mongoPass = user.password;
        const formpass = req.body.password;
        const verified = compareSync(formpass, mongoPass);
        if (!verified)
            return res.status(400).json({
                success: false,
                message: "INVALID_CREDENTIALS",
            });
        return next();
    } catch (error) {
        next(error);
    }
};
