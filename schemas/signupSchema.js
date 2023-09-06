import Joi from "joi";

// Esquema de validación para el registro de usuarios
const signupSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20) // Establece límites razonables para la longitud del nombre.
        .required()
        .messages({
            "string.min": "Name must have at least 3 characters",
            "string.max": "Name must be less than 21 characters",
            "any.required": "Name is required",
        }),

    lastName: Joi.string()
        .min(3)
        .max(20) // Establece límites razonables para la longitud del apellido.
        .required()
        .messages({
            "string.min": "Last name must have at least 3 characters",
            "string.max": "Last name must be less than 21 characters",
            "any.required": "Last name is required",
        }),

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

    country: Joi.string().required().messages({
        "any.required": "Country is required",
    }),

    photo: Joi.string().empty(), // Permite que el campo de la foto esté vacío.
});

export default signupSchema;
