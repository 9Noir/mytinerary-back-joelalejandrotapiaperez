import express from "express";
import {create,update,read,readOne,destroy} from "../controllers/controllersHandler.js"
import Activity from "../models/Activity.js";

const router = express.Router();

router.post("/", create(Activity));
router.get("/",read(Activity))
router.get("/:id",readOne(Activity))
router.put("/:id",update(Activity))
router.delete("/:id",destroy(Activity))

export default router;
