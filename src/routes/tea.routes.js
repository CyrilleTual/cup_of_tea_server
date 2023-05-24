import { Router } from "express";
import { createTea, deleteTea, displayOneTea, displayTea, modifyTea, setFavorite} from "../controllers/tea.js";

const router = Router();

router.get("/", displayTea); // donc route /tea
router.get("/:id", displayOneTea); // donc route /tea
router.post("/add", createTea);
router.delete("/delete/:id", deleteTea);
router.put("/modify/:id", modifyTea);
router.put("/favorite", setFavorite);

export default router;
