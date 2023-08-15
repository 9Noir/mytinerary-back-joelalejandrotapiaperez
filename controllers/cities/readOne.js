import City from "../../models/City.js";

export default async (req, res) => {
    try {
        let city = await City.findOne({ _id: req.params.id }); //.select("city country -_id");
        if (!city) throw new Error("City not found");

        return res.status(200).json({
            success: true,
            message: "found",
            response: city,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not found",
            response: error,
        });
    }
};
