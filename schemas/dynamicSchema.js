import Joi from "joi";
export default function dynamicSchema(schema, data) {
    let dynamicSchema = {};
    for (const key in data) {
        dynamicSchema[key] = schema.extract(key);
    }
    dynamicSchema = Joi.object(dynamicSchema);
    return dynamicSchema;
}
