import Query from "../models/index.js";

/**
 * Selection de tous les teaPack
 */
export const displayTeaPack = async (req, res) => {
  try {
    // recupération des champs du post
    const query = `
        SELECT * FROM teaPackaging
    `;
    const result = await Query.find(query);
    res.status(200).json({ result });
  } catch (error) {
    res.json({ msg: error });
  }
};

/**
 * creation d'un teaPackaging
 */
export const createTeaPack = async (req, res) => {

  const { stock, price, tea_id, packaging_id } =(req.body);

  console.log(stock, price, tea_id, packaging_id);

  try {
    const query = `
        INSERT INTO teaPackaging (stock, price, tea_id, packaging_id) 
        VALUES (?, ?, ?, ?)
    `;
    await Query.write(query, {
      stock,
      price,
      tea_id,
      packaging_id,
    });
    res.status(200).json(" crearted ");
  } catch (error) {
    res.json({ msg: error });
  }
   
};