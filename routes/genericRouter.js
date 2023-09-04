import express from "express";
import createController from "../controllers/createController.js";
import readController from "../controllers/readController.js";
import readOneController from "../controllers/readOneController.js";
import updateController from "../controllers/updateController.js";
import destroyController from "../controllers/destroyController.js";

const genericRouter = (model) => {
    const router = express.Router();
    router.post("/", createController(model));
    router.get("/", readController(model));
    router.get("/:id", readOneController(model));
    router.put("/:id", updateController(model));
    router.delete("/:id", destroyController(model));
    return router;
};

export default genericRouter;
