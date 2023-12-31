import jwt from "jsonwebtoken";

export default (req, res, next) => {
    try {
        const token = jwt.sign({ email: req.body.email || req.user.email, role: req.user.role }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });
        req.token = token;
        return next();
    } catch (error) {
        next(error);
    }
};
