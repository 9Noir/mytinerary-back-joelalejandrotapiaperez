import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
    {
        content: { type: String, required: true },
        user: { type: Types.ObjectId, required: true, ref: "users" },
        itinerary: { type: Types.ObjectId, required: true, ref: "itineraries" },
    },
    {
        timestamps: true,
    }
);

const Comment = model("comments", commentSchema);
export default Comment;
