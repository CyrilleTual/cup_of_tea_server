import Query from "../models/index.js";
import formidable from "formidable";
import fs from "fs";

/**
 * Selection de tous les thés
 */
export const displayTea = async (req, res) => {
  try {
    // recupération des champs du post
    const query = `
        SELECT * FROM tea
    `;
    const result = await Query.find(query);
    res.status(200).json({ result });
  } catch (error) {
    res.json({ msg: error });
  }
};

/**
 * selection d'un thé et d'url de son image
 */
export const displayOneTea = async (req, res) => {

    const { id } = req.params;
  try {
    // recupération des champs du post
    const query = `
        SELECT tea.id as teaId, category_id, mainTitle, subTitle, description, img.id as imgId,  img.url 
        FROM  tea
        JOIN img ON tea.img_id = img.id
        WHERE tea.id = ?
    `;
    const result = await Query.doByValue(query, id );
    res.status(200).json({ result });
  } catch (error) {
    res.json({ msg: error });
  }
};

/**
 * Creation d'un the avec son image 
 */
export const createTea = async (req, res) => {
  const uploadDir = "./public/img/teas";
  let url_img = "";
  let imgTitle = "";
  let mainTitle = "";
  let subTitle = "";
  let description = "";
  let category_id = null;

  // configuration de formidable
  const customOptions = {
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024 * 1024, // 5Mb
    minFileSize: 10,
    multiples: false,
  };

  //// recupération des données du formulaire

  const form = formidable(customOptions);

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("Error parsing the files");
        res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }

      // on recupère par décomposition les champs du form
      ({ mainTitle, subTitle, description, category_id, imgTitle } = fields);
        category_id = parseInt(category_id);
      // traitement de l'image -> on recupère son nom de stockage : url_img
      const file = files.img;
      // si pas de photo, on efface le fichier uploadé
      fs.readFile(file.filepath, async function (err, data) {
        if (data.length == 0) {
          //console.log("File is empty!");
          fs.unlink(file.filepath, function (err) {
            if (err) throw err;
            // console.log("File deleted!");
          });
        } else {
          url_img = file.newFilename;

          // ici insertion dans la DB d'abord de l'image
          const query = `
            INSERT INTO img (title, url) 
            VALUES (?, ? )
          `;
          const [elet] = await Query.write(query, { imgTitle, url_img });
          const imgId = elet.insertId; // on recupère l'id de l'element inseré
          // insertion de la catégorie

          const query2 = `
            INSERT INTO tea (mainTitle, subTitle, description, category_id, img_id) 
              VALUES (?, ?, ?, ?, ?)
          `;



          await Query.write(query2, {
            mainTitle,
            subTitle,
            description,
            category_id,
            imgId,
          });

          res.status(201).json({ msg: "insertion ok" });
        }
      });
    });
  } catch (error) {
    res.json({ msg: error });
  }
}