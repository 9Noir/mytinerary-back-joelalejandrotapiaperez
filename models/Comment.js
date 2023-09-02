import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
    {
        content: { type: String, required: true },
        user_id: { type: Types.ObjectId, required: true, ref: "users" },
        itinerary_id: { type: Types.ObjectId, required: true, ref: "itineraries" },
    },
    {
        timestamps: true,
    }
);

const Comment = model("comments", commentSchema);
export default Comment;
