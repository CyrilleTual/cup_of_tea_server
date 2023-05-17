import { Router } from "express";
import { createPack, deletepack, displayPack, modifyPack } from "../controllers/packaging.js";
 

const router = Router();

router.get("/", displayPack); // donc route /packaging
router.post("/add", createPack);
router.delete("/delete/:id", deletepack);
router.put("/modify/:id", modifyPack);

export default router;
 