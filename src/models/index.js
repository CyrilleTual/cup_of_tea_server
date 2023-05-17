import { pool } from "../config/database.js";

class Query {
  static async find(query) {
    const [result] = await pool.execute(query);
    return result;
  }

  static async doByValue(query, value) {
    const [result] = await pool.execute(query, [value]);
    return result;
  }

  // on passe un objet et la methode recupère les values
  //**
  //  const query = `
  //     INSERT INTO com (user, msg, date, id_story)
  //     VALUES (?, ?, NOW(), ?)
  //   `;
  //   await Query.write(query, { alias, comment, id_story });
  //  */
  static async write(query, data) {
    const result = pool.execute(query, [...Object.values(data)]);
    return result;
  }

 
}

export default Query;
