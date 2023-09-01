import express from "express";
import { create, update, read, readOne, destroy } from "../controllers/handlerControllers.js";

const genericRouter = (model) => {
    const router = express.Router();

    router.post("/", create(model));
    router.get("/", read(model));
    router.get("/:id", readOne(model));
    router.put("/:id", update(model));
    router.delete("/:id", destroy(model));

    return router;
};

export default genericRouter;
