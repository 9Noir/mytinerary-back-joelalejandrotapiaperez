import { model, Schema, Types } from "mongoose";

const likeSchema = new Schema(
    {
        user_id: { type: Types.ObjectId, required: true, ref: "users" },
        itinerary_id: { type: Types.ObjectId, required: true, ref: "itineraries" },
    },
    {
        timestamps: true,
    }
);

const Like = model("likes", likeSchema);
export default Like;
