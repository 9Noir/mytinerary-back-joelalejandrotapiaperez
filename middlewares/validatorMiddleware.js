import dynamicSchema from "../schemas/dynamicSchema.js";

export default (schema, custom = false) =>
    (req, res, next) => {
        const validation = custom ? dynamicSchema(schema, req.body).validate(req.body) : schema.validate(req.body);

        if (validation.error) {
            console.log(validation.error);
            return res.status(400).json({
                success: false,
                message: validation.error.details[0].message,
            });
        }

        return next();
    };
