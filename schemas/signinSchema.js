import Joi from "joi";

// Esquema de validación para el registro de usuarios
const signinSchema = Joi.object({
    email: Joi.string()
        .email() // Valida que el correo electrónico tenga un formato válido.
        .required()
        .messages({
            "string.base": "EMAIL_INVALID_TYPE",
            "string.email": "EMAIL_INVALID",
            "any.required": "EMAIL_REQUIRED",
        }),

    password: Joi.string()
        .min(6) // Establece un mínimo de 6 caracteres para la contraseña.
        .required()
        .messages({
            "string.base": "PASSWORD_INVALID_TYPE",
            "string.min": "PASSWORD_TOO_SHORT",
            "any.required": "PASSWORD_REQUIRED",
        }),
});

export default signinSchema;
