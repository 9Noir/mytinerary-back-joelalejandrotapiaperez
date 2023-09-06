import jwt from "jsonwebtoken";

export default (req, res, next) => {
    try {
        const token = jwt.sign({ mail: req.user.mail }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });
        req.token = token;
        console.log(req.token);
        return next();
    } catch (error) {
        next(error);
    }
};
