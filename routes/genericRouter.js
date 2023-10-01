import express from "express";
import createController from "../controllers/createController.js";
import readController from "../controllers/readController.js";
import readOneController from "../controllers/readOneController.js";
import updateController from "../controllers/updateController.js";
import destroyController from "../controllers/destroyController.js";
import tokenDecoding from "../middlewares/tokenDecodingMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";
const genericRouter = (model) => {
    const router = express.Router();
    // Aplicar autenticación solo a rutas que no sean GET, y donde el modelo sea de users
    router.use((req, res, next) => {
        if (req.method !== "GET" || model.modelName == "users") {
            tokenDecoding;
        } else {
            next();
        }
    });

    router.post("/", createController(model));
    router.get("/", readController(model));
    router.get("/:id", readOneController(model));
    router.put("/:id", updateController(model));
    router.delete("/:id", tokenDecoding, isAdmin, destroyController(model));
    return router;
};

export default genericRouter;
