import { compareSync } from "bcrypt";
import User from "../models/User.js";

export default async (req, res, next) => {
    try {
        const user = await User.findOne({ mail: req.body.mail });
        const mongoPass = user.password;
        const formpass = req.body.password;
        const verified = compareSync(formpass, mongoPass);
        if (!verified)
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        return next();
    } catch (error) {
        next(error);
    }
};
