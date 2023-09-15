import Itinerary from "../../models/Itinerary.js";
import Like from "../../models/Like.js";
import queryHelpers from "../queryHelpers.js";

export default () => async (req, res, next) => {
    try {
        const isLiked = await Like.findOne(req.body);
        const like = isLiked ? await Like.findOneAndDelete({ _id: isLiked._id }) : await Like.create(req.body);
        const updateOperator = isLiked ? { $pull: { likes: like._id } } : { $push: { likes: like._id } };
        const { populate } = queryHelpers("itineraries");
        const updatedItinerary = await Itinerary.findByIdAndUpdate(req.body.itinerary_id, updateOperator, { new: true, populate });
        return res.status(isLiked ? 200 : 201).json({
            success: true,
            message: `${isLiked ? "Deleted" : "Created"} like and updated itinerary`,
            response: updatedItinerary,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
