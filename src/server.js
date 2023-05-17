import express from "express";
import "dotenv/config";

// on récupère les variables d'environnement
import { LOCAL_PORT } from "./config/const.js";
import { adminDisplayCat, createCategoryProcess } from "./controllers/category.js";
const PORT = process.env.PORT || LOCAL_PORT;


console.log ("port",PORT)


const app = express();


app
  .use(express.static("public"))
  .use(express.json()) // basé sur body-parse rôle pour le json
  .use(express.urlencoded({ extended: true })); // aussi basé sur body parser


// route pour vérifier la connexion de notre application (serveur)
app.get("/", (req, res) => {
  res.json({ msg: `app running` });
});

// test de la BD

app.get ("/admin", adminDisplayCat);
app.post("/test", createCategoryProcess);






app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));