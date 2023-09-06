import Joi from "joi";

// Esquema de validación para el registro de usuarios
const signinSchema = Joi.object({
    email: Joi.string()
        .email() // Valida que el correo electrónico tenga un formato válido.
        .required()
        .messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(6) // Establece un mínimo de 6 caracteres para la contraseña.
        .required()
        .messages({
            "string.min": "Password must have at least 6 characters",
            "any.required": "Password is required",
        }),
});

export default signinSchema;
