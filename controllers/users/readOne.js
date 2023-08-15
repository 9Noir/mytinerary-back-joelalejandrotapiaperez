import User from "../../models/User.js";

export default async (req, res) => {
    try {
        let user = await User.findOne({_id:req.params.id}).select("mail photo -_id");
        // select para seleccionar que propiedades quiero leer del objeto, - para no mostrar la propiedad id por default
        // let user = await User.findById(req.params.id);
        if (!user) throw new Error;
        return res.status(200).json({
            success: true,
            message: "user found",
            response: user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not found",
            response: error,
        });
    }
};
