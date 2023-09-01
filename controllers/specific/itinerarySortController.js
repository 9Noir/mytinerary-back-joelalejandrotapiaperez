export default (model) => async (req, res, next) => {
    try {
        const data = await model.aggregate([
            {
                $addFields: {
                    aux_size: { $size: "$likes" },
                },
            },
            {
                $sort: { aux_size: -1 },
            },
            {
                $project: {
                    aux_size: 0,
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Found",
            response: data,
        });
    } catch (error) {
        next(error);
    }
};
