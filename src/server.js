import express from "express";
import "dotenv/config";

// on récupère les variables d'environnement
import { LOCAL_PORT } from "./config/const.js";
import { adminDisplayCat } from "./controllers/admin.js";
const PORT = process.env.PORT || LOCAL_PORT;


console.log ("port",PORT)


const app = express();

// route pour vérifier la connexion de notre application (serveur)
app.get("/", (req, res) => {
  res.json({ msg: `app running` });
});

// test de la BD

app.get ("/admin", adminDisplayCat);





app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));