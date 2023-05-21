import { Router } from "express";
import { createTea, deleteTea, displayOneTea, displayTea} from "../controllers/tea.js";

const router = Router();

router.get("/", displayTea); // donc route /tea
router.get("/:id", displayOneTea); // donc route /tea
router.post("/add", createTea);
router.delete("/delete/:id", deleteTea);
// router.put("/modify/:id", modifyTea);

export default router;
