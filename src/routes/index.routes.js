import { Router} from "express";
import category_routes from "./category.routes.js"

const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: `app running` });
});

router.use ("/category", category_routes);





export default router;