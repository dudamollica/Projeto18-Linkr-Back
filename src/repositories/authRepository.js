import { db } from "../config/database.js";
import { TABLE } from "../enums/tables.js";

export async function insertUserIntoUser(
  username,
  email,
  picture_url,
  password
) {
  return db.query(
    `INSERT INTO ${TABLE.USERS} (username, email, picture_url, password) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT * FROM ${TABLE.USERS} WHERE email = $5);`,
    [username, email, picture_url, password, email]
  );
}

export async function selectUserByEmail(email) {
  return db.query(`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`, [email]);
}
