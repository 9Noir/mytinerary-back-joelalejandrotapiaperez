import { Router } from "express";
import Comment from "../models/Comment.js";
import Itinerary from "../models/Itinerary.js";
import queryHelpers from "../controllers/queryHelpers.js";

async function updateItinerary(req, res, next) {
    try {
        console.log(req.body);
        console.log(Boolean(req.body));
        let updatedItinerary = req.body ? {} : await Itinerary.findByIdAndUpdate(req.params.itinerary_id, { $pull: { comments: req.params.comment_id } });
        console.log(updateItinerary);
        if (!updatedItinerary) throw new Error("itinerary not found");
        const { populate } = queryHelpers("itineraries");
        updatedItinerary = await Itinerary.findOne({ _id: req.params.itinerary_id }).populate(populate);
        if (!updatedItinerary) throw new Error("itinerary not found");
        return res.status(200).json({
            success: true,
            message: `${req.body ? "Updated" : "Deleted"} comment and updated itinerary`,
            response: updatedItinerary,
        });
    } catch (error) {
        next(error);
    }
}
const commentRouter = Router();

commentRouter.delete("/:itinerary_id/:comment_id", async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.comment_id);
        if (!deletedComment) throw new Error("comment not found");
        updateItinerary(req, res, next);
    } catch (error) {
        next(error);
    }
});

commentRouter.put("/:itinerary_id/:comment_id", async (req, res, next) => {
    try {
        console.log(req.body);
        const updatedComment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body, { new: true });
        console.log(updatedComment);
        if (!updatedComment) throw new Error("comment not found");
        console.log(updatedComment);
        updateItinerary(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default commentRouter;
