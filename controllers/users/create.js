import User from "../../models/User.js";

export default async (req, res) => {
    // RES objeto de respuesta
    // REQ es el objeto donde el cliente le manda MUCHOS DATOS importantes acerca de la petición
    // Las propiedades de req mas importante son:
    // BODY: objeto que generalmente se envía a traves de formularios
    // PARAMS: suelen ser estáticos como el id de una ciudad a buscar por ejemplo
    // QUERIES: son opcionales y nos indican algunas consultas/filtros/modos de ver la info/de la página etc
    try {
        let newUser = await User.create(req.body);
        // 201, exito en la creación
        // 200, cualquier otro exito
        return res.status(201).json({
            success: true,
            message: "user created",
            response: newUser._id,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not created",
            response: error,
        });
    }
}