import { model, Schema, Types } from "mongoose";

let collection = "itineraries";
let schema = new Schema(
    {
        creator: { type: Types.ObjectId, required: true, ref: "users" },
        name: { type: String, required: true },
        city_id: { type: Types.ObjectId, required: true, ref: "cities" },
        price: { type: Number, required: true },
        duration: { type: Number, required: true },
        tags: [{ type: String }],
        photo: { type: String, default: null },
        comments: [{ type: Types.ObjectId, ref: "comments" }],
        likes: [{ type: Types.ObjectId, ref: "likes" }],
    },
    {
        timestamps: true,
    }
);

let Itinerary = model(collection, schema);
export default Itinerary;
