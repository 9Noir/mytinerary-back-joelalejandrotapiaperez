import express from "express";
import {create,update,read,readOne,destroy} from "../controllers/controllersHandler.js"
import User from "../models/User.js";

const router = express.Router();

router.post("/", create(User));
router.get("/",read(User))
router.get("/:id",readOne(User))
router.put("/:id",update(User))
router.delete("/:id",destroy(User))

export default router;
