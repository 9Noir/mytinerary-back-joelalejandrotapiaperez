import Itinerary from "../../models/Itinerary.js";
import Like from "../../models/Like.js";
import queryHelpers from "../queryHelpers.js";

export default () => async (req, res, next) => {
    try {
        const { _id, user_id, itinerary_id } = req.body;
        const like = _id ? await Like.findOneAndDelete({ _id: _id }) : await Like.create({ user_id: user_id, itinerary_id: itinerary_id });
        if (!like) throw new Error("Like not found");
        const updateOperator = _id ? { $pull: { likes: like._id } } : { $push: { likes: like._id } };
        const { populate } = queryHelpers("itineraries");
        const updatedItinerary = await Itinerary.findByIdAndUpdate(itinerary_id, updateOperator, { new: true, populate });
        return res.status(_id ? 200 : 201).json({
            success: true,
            message: `${_id ? "Deleted" : "Created"} like and updated itinerary`,
            response: updatedItinerary,
        });
    } catch (error) {
        next(error);
    }
};
