import User from "../models/User.js";
import { hashSync } from "bcrypt";

export default async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.user.email });
        if (!user) {
            req.user.password = hashSync(req.body.token_id, 10);
            user = await User.create(req.user);
            console.log(user);
            return next();
        }
        // req.user._id = user._id;
        return next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
