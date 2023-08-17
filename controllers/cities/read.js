import City from "../../models/City.js";

export default async (req, res, next) => {
    const cityAttributes = Object.keys(City.schema.paths);
    const query = {};
    const sort = {};
    if (req.query.sort) sort = { [req.query.sort]: req.query.order === "DESC" ? -1 : 1 };

    console.log(JSON.stringify(sort));

    for (const field in req.query) {
        if (cityAttributes.includes(field)) {
            // query[field] = new RegExp(,'i') ;
            query[field] = new RegExp(`^${req.query[field]}`, "i");
        }
    }

    try {
        let allCities = await City.find(query).populate("admin_id", "photo name mail -_id").sort(sort);
        // let allCities = await City.find({},'city photo -_id').populate('admin_id','photo name mail -_id');
        //find({filtro},'parametros a regresar')
        // POPULATE: para rellenar datos relacionados, en este caso el id del admin_id traeria todo el objeto, pero selecciono solo los que necesito
        return res.status(200).json({
            success: true,
            message: "found",
            response: allCities,
        });
    } catch (error) {
        // return res.status(400).json({
        //     success: false,
        //     message: "not found",
        //     response: error,
        // });
        next(error);
    }
};
