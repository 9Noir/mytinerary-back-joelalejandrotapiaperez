import express from "express";
import generic from "./genericRouter.js";
import User from "../models/User.js";
import City from "../models/City.js";
import Itinerary from "../models/Itinerary.js";
import Activity from "../models/Activity.js";
import Like from "../models/Like.js";
import Comment from "../models/Comment.js";
import itinerariesSorted from "../controllers/itinerary/itinerariesSortedByLikesController.js";
import toggleLike from "../controllers/itinerary/toggleLikeController.js";
import itineraryCommentRouter from "../controllers/itinerary/itineraryCommentController.js";
import authRouter from "./authRouter.js";
import passport from "../middlewares/tokenDecodingMiddleware.js";
let router = express.Router();

// Endpoints
router.get("/", function (req, res, next) {
    res.render("index", { title: "Index" });
});
// Particulares
router.use("/auth", authRouter);
router.get("/itineraries/sorted-by-likes", itinerariesSorted(Itinerary));
router.use("/itineraries/comments", passport.authenticate("jwt", { session: false }), itineraryCommentRouter);
router.post("/itineraries/toggle-like", passport.authenticate("jwt", { session: false }), toggleLike());

// Genéricas
router.use("/users", generic(User));
router.use("/cities", generic(City));
router.use("/itineraries", generic(Itinerary));
router.use("/activities", generic(Activity));
router.use("/likes", generic(Like));
router.use("/comments", generic(Comment));

export default router;
