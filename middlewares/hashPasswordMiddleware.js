import { hashSync } from "bcrypt";

export default (req, res, next) => {
    try {
        if (req.body.password) req.body.password = hashSync(req.body.password, 10);
        return next();
    } catch (error) {
        next(error);
    }
};
