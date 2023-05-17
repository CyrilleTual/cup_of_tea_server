import { Router } from "express";
import { adminDisplayCat, createCategoryProcess } from "../controllers/category.js";

const router = Router();

router.get("/", adminDisplayCat);  // donc route /category
router.post("/add", createCategoryProcess);


export default router; 