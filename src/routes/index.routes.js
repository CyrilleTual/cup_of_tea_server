import { Router} from "express";
import category_routes from "./category.routes.js"
import pack_routes from "./packaging.routes.js"
import tea_routes from "./tea.routes.js"
import teaPackaging_routes from "./teaPackaging.routes.js"

const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: `app running` });
});

router.use ("/category", category_routes);
router.use("/pack", pack_routes);
router.use("/tea", tea_routes);
router.use("/teaPackaging", teaPackaging_routes);




export default router;