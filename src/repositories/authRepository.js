import { db } from "../config/database.js";
import { TABLE } from "../enums/tables.js";

export async function insertUserIntoUsers(
  username,
  email,
  picture_url,
  password
) {
  return await db.query(
    `INSERT INTO ${TABLE.USERS} (username, email, picture_url, password) 
        SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT * FROM ${TABLE.USERS} 
        WHERE email = $5);`,
    [username, email, picture_url, password, email]
  );
}

export async function selectUserByEmail(email) {
  return await db.query(`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`, [
    email,
  ]);
}

export async function selectUserFromSessions(user_id) {
  return await db.query(`SELECT * FROM ${TABLE.SESSIONS} WHERE user_id = $1;`, [
    user_id,
  ]);
}

export async function selectUserByToken(token) {
  return await db.query(`SELECT * FROM ${TABLE.SESSIONS} WHERE token = $1;`, [
    token,
  ]);
}

export async function deleteUserFromSessions(token) {
  return await db.query(`DELETE FROM ${TABLE.SESSIONS} WHERE token = $1;`, [
    token,
  ]);
}

export async function insertUserIntoSessions(user_id, token) {
  return db.query(
    `INSERT INTO ${TABLE.SESSIONS} (user_id, token) VALUES ($1, $2);`,
    [user_id, token]
  );
}
