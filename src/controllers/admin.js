import { pool } from "../config/database.js";
import Query from "../models/index.js";

export const adminDisplayCat = async (req, res) => {
    try {
      // recupération des champs du post
      const query = `
        SELECT category.id, categoryName, img.id, img.title, img.url, img.alt
        FROM category
        JOIN img ON category.img_id = img.id
    `;
      const result = await Query.find(query);

      res.json({ result });

    
    } catch (error) {
      res.json({ msg: error });
    }

}