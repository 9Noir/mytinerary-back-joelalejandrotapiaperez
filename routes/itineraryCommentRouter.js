import { Router } from "express";
import Comment from "../models/Comment.js";
import Itinerary from "../models/Itinerary.js";
import queryHelpers from "../controllers/queryHelpers.js";

async function updateItinerary(req, res, next, newCommentId = null) {
    try {
        const { populate } = queryHelpers("itineraries");
        const updateOperator = newCommentId ? { $push: { comments: newCommentId } } : req.body ? {} : { $pull: { comments: req.params.comment_id } };
        let updatedItinerary = await Itinerary.findByIdAndUpdate(req.params.itinerary_id, updateOperator, { new: true, populate });
        if (!updatedItinerary) throw new Error("itinerary not found");
        return res.status(newCommentId ? 201 : 200).json({
            success: true,
            message: `${newCommentId ? "Created" : req.body ? "Updated" : "Deleted"} comment and updated itinerary`,
            response: updatedItinerary,
        });
    } catch (error) {
        next(error);
    }
}
const commentRouter = Router();

commentRouter.post("/:itinerary_id/addcomment", async (req, res, next) => {
    const createdComment = await Comment.create(req.body);
    console.log(createdComment);
    updateItinerary(req, res, next, createdComment._id);
});

commentRouter.put("/:itinerary_id/:comment_id", async (req, res, next) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body, { new: true });
        if (!updatedComment) throw new Error("comment not found");
        updateItinerary(req, res, next);
    } catch (error) {
        next(error);
    }
});

commentRouter.delete("/:itinerary_id/:comment_id", async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.comment_id);
        if (!deletedComment) throw new Error("comment not found");
        updateItinerary(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default commentRouter;
