import { Router } from "express";
import { adminDisplayCat, 
        createCategoryProcess,
        modifyCat, 
        deleteCat } from "../controllers/category.js";

const router = Router();

router.get("/", adminDisplayCat);  // donc route /category
router.post("/add", createCategoryProcess);
router.delete("/:id", deleteCat)
router.put("/modify/:id", modifyCat);

export default router; 