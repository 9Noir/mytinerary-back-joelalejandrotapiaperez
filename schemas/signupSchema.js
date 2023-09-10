import Joi from "joi";

// Esquema de validación para el registro de usuarios
const signupSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        "string.min": "NAME_TOO_SHORT",
        "string.max": "NAME_TOO_LONG",
        "any.required": "NAME_REQUIRED",
    }),

    lastName: Joi.string().min(3).max(20).required().messages({
        "string.min": "LAST_NAME_TOO_SHORT",
        "string.max": "LAST_NAME_TOO_LONG",
        "any.required": "LAST_NAME_REQUIRED",
    }),

    email: Joi.string().email().required().messages({
        "string.email": "EMAIL_INVALID",
        "any.required": "EMAIL_REQUIRED",
    }),

    password: Joi.string().min(6).required().messages({
        "string.min": "PASSWORD_TOO_SHORT",
        "any.required": "PASSWORD_REQUIRED",
    }),

    country: Joi.string().required().messages({
        "any.required": "COUNTRY_REQUIRED",
    }),

    photo: Joi.string().empty(),
});

export default signupSchema;
