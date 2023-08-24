import express from "express";
import {create,update,read,readOne,destroy} from "../controllers/controllersHandler.js"
import Itinerary from "../models/Itinerary.js";

const router = express.Router();

router.post("/", create(Itinerary));
router.get("/",read(Itinerary))
router.get("/:id",readOne(Itinerary))
router.put("/:id",update(Itinerary))
router.delete("/:id",destroy(Itinerary))

export default router;
