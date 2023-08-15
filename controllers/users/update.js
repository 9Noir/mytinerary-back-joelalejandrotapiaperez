import User from "../../models/User.js";

export default async (req, res) => {
    try {
        let updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            // Por default en FALSE y devuelve el OBJETO ANTES de la modificación
            // Si lo cambio a TRUE devuelvo el OBJETO LUEGO de la modificación
        ).select("name photo mail");

        if (!updatedUser) throw new Error;
        return res.status(200).json({
            success: true,
            message: "updated user",
            response: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not updated",
            response: error,
        });
    }
};
