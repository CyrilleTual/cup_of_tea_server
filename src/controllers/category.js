import Query from "../models/index.js";
import formidable from "formidable";
import fs from "fs";

export const adminDisplayCat = async (req, res) => {
    try {
      // recupération des champs du post
      const query = `
        SELECT category.id as catId , category.title as catTitle, description, img.id as imgId,  img.url 
        FROM category
        JOIN img ON category.img_id = img.id
    `;
      const result = await Query.find(query);

      res.status(200).json({ result });
    
    } catch (error) {
      res.json({ msg: error });
    }

}

/**
 * creation d'une nouvelle catégorie avec photo
 * on se base sur formidable 
 */
export const createCategoryProcess = async (req,res) => {

  const uploadDir = "./public/img/categories";
  let url_img = "";
  let imgTitle = "";
  let title= "";
  let description= "";
 
  // configuration de formidable
  const customOptions = {
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024 * 1024, // 5Mb
    minFileSize: 10,
    multiples: false,
  };

  //// recupération des données du formulaire 

  const form =  formidable(customOptions);

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
      ({ title, description, imgTitle } = fields);
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
          console.log("coucou1", url_img);

          // ici insertion dans la DB d'abord de l'image
          const query = `
            INSERT INTO img (title, url) 
            VALUES (?, ? )
          `;
          const [elet]  = await Query.write(query, { imgTitle, url_img });
          const imgId = elet.insertId; // on recupère l'id de l'element inseré
          // insertion de la catégorie 

          console.log (imgId)

          const query2 = `
            INSERT INTO category (title, description, img_id) 
              VALUES (?, ?, ?)
          `;
          await Query.write(query2, { title, description, imgId });

          res.status(201).json({ msg: "insertion ok" });

        }
      });
    })
  } catch (error) {
    res.json({ msg: error });
  }
}