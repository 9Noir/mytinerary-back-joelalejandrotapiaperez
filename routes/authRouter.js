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
import userUpdateController from "../controllers/auth/userUpdateController.js";
import verifyGoogle from "../middlewares/verifyGoogle.js";
import findOrCreateGoogle from "../middlewares/findOrCreateGoogle.js";
import emailController from "../controllers/auth/emailController.js";

const authRouter = Router();

authRouter.post("/signup", validator(signupSchema), emailExists(), hashPassword, signup);
authRouter.post("/signup/step1", validator(signupSchema, true), emailExists(true));
authRouter.post("/signin", validator(signinSchema), emailNotExists(), passwordValidation, tokenValidation, signin);
authRouter.post("/signin/step1", validator(signinSchema, true), emailNotExists(true));
authRouter.post("/token", passport.authenticate("jwt", { session: false }), tokenValidation, tokenSignin);
authRouter.post("/signout", passport.authenticate("jwt", { session: false }), signout);
authRouter.put("/userUpdate", validator(signupSchema, true), passport.authenticate("jwt", { session: false }), emailExists(), tokenValidation, hashPassword, userUpdateController);
authRouter.post("/google", verifyGoogle, findOrCreateGoogle, tokenValidation, signin);

authRouter.post("/password-recovery", emailNotExists(), tokenValidation, emailController);

export default authRouter;
