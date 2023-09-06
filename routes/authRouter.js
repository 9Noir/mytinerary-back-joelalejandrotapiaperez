import { Router } from "express";
import register from "../controllers/auth/registerController.js";
import registerSchema from "../schemas/registerSchema.js";
import validator from "../middlewares/validatorMiddleware.js";
import emailExists from "../middlewares/emailExistsMiddleware.js";
import hashPassword from "../middlewares/hashPasswordMiddleware.js";
import signin from "../controllers/auth/signinController.js";
import signinSchema from "../schemas/signinSchema.js";
import emailNotExists from "../middlewares/emailNotExistsMiddleware.js";
import passwordValidation from "../middlewares/passwordValidationMiddleware.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/register", validator(registerSchema), emailExists, hashPassword, register);
authRouter.post("/signin", validator(signinSchema), emailNotExists, passwordValidation,tokenValidationMiddleware, signin);
export default authRouter;
