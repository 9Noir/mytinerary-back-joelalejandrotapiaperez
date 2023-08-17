import express from "express";
import {create,update,read,readOne,destroy} from "../controllers/controllersHandler.js"
import City from "../models/City.js";

const router = express.Router();

router.post("/", create(City));
router.get("/",read(City))
router.get("/:id",readOne(City))
router.put("/:id",update(City))
router.delete("/:id",destroy(City))

export default router;
