import { model, Schema } from "mongoose";
// Define los posibles valores para el campo "role"
const validRoles = ["admin", "user"];
let collection = "users";
let schema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true }, //unique true, no hay mails duplicados
        photo: { type: String, default: "https://i.im.ge/2023/09/06/wWXRTM.defaultUserPhoto.jpg" }, //default: "url" vuelve al parametro opcional, sino usa el deafult
        password: { type: String, required: true },
        country: { type: String, required: true },
        google: { type: Boolean, default: false },
        role: { type: String, default: "user", enum: validRoles }, // Valor predeterminado "user"
    },
    {
        timestamps: true,
    }
);

let User = model(collection, schema);

export default User;
