import Query from "../models/index.js";


/**
 * Selection de tous les packaging
 */
export const displayPack = async (req, res) => {
  try {
    // recupération des champs du post
    const query = `
        SELECT * FROM packaging
    `;
    const result = await Query.find(query);

    res.status(200).json({ result });
  } catch (error) {
    res.json({ msg: error });
  }
};

/**
 * creation d'un packaging
 */
export const createPack = async (req, res) => {
    const { weight } = req.body;
  try {
    // recupération des champs du post
    const query = `
        INSERT INTO packaging (weight) VALUES (?)
    `;
    const result = await Query.write(query, {weight});
    res.status(200).json(" crearted ");
  } catch (error) {
    res.json({ msg: error });
  }
};

/**
 * Delete pack
 */
export const deletepack = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE  FROM packaging WHERE id = ?`;
        await Query.doByValue(query, parseInt(id));
        res.status(200).json ( "deleted ");
    } catch (error) {
        res.status(200).json({ msg: error });
    }
};

/**
 * Modify pack
 */
export const modifyPack = async (req, res) => {
  const { id } = req.params;
  const { weight } = req.body;
  
  try {
    const query = `UPDATE packaging
          SET weight = ?
          WHERE id = ?
    `;
    await Query.write(query, { weight, id });
    res.status(200).json("updated ");
  } catch (error) {
    res.status(200).json({ msg: error });
  }
}