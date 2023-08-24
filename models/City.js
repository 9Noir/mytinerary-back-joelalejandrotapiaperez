import { model, Schema, Types } from "mongoose";

let collection = "cities";
let schema = new Schema({
    country: { type: String, required: true },
    fundation: { type: Date, required: true },
    population: { type: Number },
    photo: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, default: "City description" },
    smallDescription: { type: String, default: "Small City description" },
    featuredLocation: { type: String, default: "edit later" },
    admin_id: { type: Types.ObjectId, required: true, ref: "users" },
    // Para relacionar datos en mongo es necesario referencia el dato hacia la coleccion que necesito relacionarme
});

//estoy parado en el modelo City de la coleccion cities
//y necesito relacionar la propiedad admin_id con la coleccion users
//esto lo logro REFERENCIANDO con la propiedad ref:'nombreDeLaColeccionaReferenciarse'

let City = model(collection, schema);
export default City;
