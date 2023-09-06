import { Router } from "express";
import signup from "../controllers/auth/signupController.js";
import signupSchema from "../schemas/signupSchema.js";
import validator from "../middlewares/validatorMiddleware.js";
import emailExists from "../middlewares/emailExistsMiddleware.js";
import hashPassword from "../middlewares/hashPasswordMiddleware.js";
import signin from "../controllers/auth/signinController.js";
import signinSchema from "../schemas/signinSchema.js";
import emailNotExists from "../middlewares/emailNotExistsMiddleware.js";
import passwordValidation from "../middlewares/passwordValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import tokenSignin from "../controllers/auth/tokenSigninController.js";
import passport from "../middlewares/tokenDecodingMiddleware.js";
import signout from "../controllers/auth/signoutController.js";

const authRouter = Router();

authRouter.post("/signup", validator(signupSchema), emailExists, hashPassword, signup);
authRouter.post("/signin", validator(signinSchema), emailNotExists, passwordValidation, tokenValidation, signin);
authRouter.post("/token", passport.authenticate("jwt", { session: false }), tokenValidation, tokenSignin);
authRouter.post("/signout", passport.authenticate("jwt", { session: false }), signout);
export default authRouter;
