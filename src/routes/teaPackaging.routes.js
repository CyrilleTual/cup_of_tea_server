import { Router } from "express";

import { createTeaPack } from "../controllers/teaPackaging.js";
import { displayTeaPack } from "../controllers/teaPackaging.js";

const router = Router();

router.get("/", displayTeaPack); // donc route /teaPackaging
router.post("/add", createTeaPack);
//router.delete("/delete/:id", deleteTeapack);
//router.put("/modify/:id", modifyTeaPack);

export default router;
