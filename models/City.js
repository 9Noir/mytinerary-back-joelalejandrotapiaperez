import { model, Schema, Types } from "mongoose";

let collection = "cities";
let schema = new Schema(
    {
        country: { type: String, required: true },
        language: { type: String, required: true },
        currency: {
            abbreviation: { type: String, required: true },
            name: { type: String, required: true },
        },
        foundation: { type: Date, required: true },
        population: { type: Number },
        photo: { type: String, required: true },
        city: { type: String, required: true },
        description: { type: String, default: "City description" },
        smallDescription: { type: String, default: "Small City description" },
        featuredLocation: { type: String, default: "To be updated" },
        admin_id: { type: Types.ObjectId, required: true, ref: "users" },
    },
    {
        timestamps: true,
    }
);

let City = model(collection, schema);
export default City;
