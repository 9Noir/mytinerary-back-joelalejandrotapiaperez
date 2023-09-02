import Itinerary from "../../models/Itinerary.js";
import Like from "../../models/Like.js";
// Controlador para manejar el toggle de like (crear o eliminar)
export default () => async (req, res) => {
    try {
        const { _id = null, user_id, itinerary_id } = req.body;
        if (_id) {
            const deletedLike = await Like.findOneAndDelete({ _id: _id });

            if (deletedLike) {
                await Itinerary.findByIdAndUpdate(itinerary_id, { $pull: { likes: deletedLike._id } });
                return res.status(200).json({ succes: true, message: "Like deleted", response: deletedLike });
            } else {
                return res.status(404).json({ succes: false, message: "Like not found", response: deletedLike });
            }
        } else {
            // Si el like no existe, crearlo
            const newLike = new Like({ user_id: user_id, itinerary_id: itinerary_id });
            await newLike.save();
            await Itinerary.findByIdAndUpdate(itinerary_id, { $push: { likes: newLike._id } });
            return res.status(201).json({ succes: true, message: "Like added", response: newLike });
        }
    } catch (error) {
        res.status(500).json({ succes: false, message: "Server error", response: error });
    }
};
