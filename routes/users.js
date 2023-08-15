import express from "express";
import create from "../controllers/users/create.js";
import read from "../controllers/users/read.js";
import readOne from "../controllers/users/readOne.js";
import update from "../controllers/users/update.js";
import destroy from "../controllers/users/destroy.js";

const router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//     res.send("respond with a resource");
// });

// CREATE
router.post("/", create);

// READ
router.get("/",read)
router.get("/:id",readOne)
// El nombre del parametro debe ser el mismo aca como en el controller

// UPDATE
router.put("/:id",update)

// DELETE
router.delete("/:id",destroy)


export default router;
