import City from "../../models/City.js";

export default async (req, res) => {
    try {
        let updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true }); //.select("city country -_id")
        if (!updatedCity) throw new Error("City not found");
        
        return res.status(200).json({
            success: true,
            message: "updated",
            response: updatedCity,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not updated",
            response: error,
        });
    }
};
