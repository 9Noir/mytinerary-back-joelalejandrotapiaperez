import { model, Schema } from "mongoose";

let collection = "users";
let schema = new Schema({
    name: { type: String, required: true },
    lastName: { ty: String },
    mail: { type: String, required: true, unique: true }, //unique true, no hay mails duplicados
    photo: { type: String, deafult: "urldeafult" }, //vuelve al parametro opcional, sino usa el deafult
    password: { type: String, required: true },
    country: { type: String, required: true },
});

let User = model(collection, schema);

export default User
