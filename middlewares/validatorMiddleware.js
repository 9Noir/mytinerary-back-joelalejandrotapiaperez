export default (schema) => (req, res, next) => {
    const validation = schema.validate(req.body);
    // const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        console.log(validation.error)
        return res.status(400).json({
            success: false,
            message: validation.error.details.map((error) => error.message),
        });
    }
    return next();
};
