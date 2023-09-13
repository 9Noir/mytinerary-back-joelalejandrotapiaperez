import User from "../models/User.js";
import { hashSync } from "bcrypt";

export default async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            req.user.password = hashSync(req.body.token_google, 10);
            user = await User.create(req.user);
            return next();
        }
    } catch (error) {
        console.log(error);
    }
};
