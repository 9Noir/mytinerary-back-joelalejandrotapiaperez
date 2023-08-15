import City from "../../models/City.js";

export default async (req, res) => {
    try {
        let deletedCity = await City.findOneAndDelete({ _id: req.params.id });
        if (!deletedCity) throw new Error("City not found");

        return res.status(200).json({
            success: true,
            message: "deleted",
            response: deletedCity,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not deleted",
            response: error,
        });
    }
};
