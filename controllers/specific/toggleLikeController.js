import Like from '../models/Like.js'
// Controlador para manejar el toggle de like (crear o eliminar)
export const toggleLike = async (req, res) => {
    try {
        const { user_id, itinerary_id } = req.body;

        const existingLike = await Like.findOne({ user: user_id, itinerary: itinerary_id });

        if (existingLike) {
            // Si el like ya existe, eliminarlo
            const deletedLike = await Like.findOneAndDelete({ user: user_id, itinerary: itinerary_id });
            if (deletedLike) {
                await Itinerary.findByIdAndUpdate(itinerary_id, { $pull: { likes: deletedLike._id } });
                return res.status(200).json({ message: "Like eliminado exitosamente." });
            } else {
                return res.status(404).json({ error: "Like no encontrado." });
            }
        } else {
            // Si el like no existe, crearlo
            const newLike = new Like({ user: user_id, itinerary: itinerary_id });
            await newLike.save();
            await Itinerary.findByIdAndUpdate(itinerary_id, { $push: { likes: newLike._id } });
            return res.status(201).json({ message: "Like agregado exitosamente." });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al procesar el like." });
    }
};
