import User from "../models/User.js";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

passport.use(
    // Se obliga al passport a usar una estrategia de extracción de token
    new Strategy(
        // Depende del objeto de configuración de la estrategia
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
        },
        // Callback que depende de el resultado de la extracción
        async (jwt_payload, done) => {
            try {
                const user = await User.findOne({ email: jwt_payload.email }, "-password -__v -createdAt -updatedAt");
                if (user) {
                    return done(null, user);
                } else {
                    return done(null);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        if (!user) return res.status(401).json({ success: false, message: "UNAUTHORIZED", response: info });
        req.user = user;
        next();
    })(req, res, next);
};
