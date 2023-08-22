export default (model) => async (req, res, next) => {
    try {
        const fillParams =
            {
                cities: { populate: { path: "admin_id", select: "photo name mail -_id" } },
                itineraries: { populate: { path: "city_id", select: "city -_id" } },
                activities: { populate: { path: "itinerary_id", select: "name -_id" } },
            }[model.modelName] || "";

        let data = await model.findOne({ _id: req.params.id }).populate(fillParams.populate);
        if (!data) throw new Error("not found");

        return res.status(200).json({
            success: true,
            message: "found",
            response: data,
        });
    } catch (error) {
        next(error);
    }
};
