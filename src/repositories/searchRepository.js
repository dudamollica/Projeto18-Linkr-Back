import db from "../config/database.js";

async function getSearch(name) {
  return await db.query(
    `SELECT id, username, picture_url FROM users WHERE username ILIKE '%${name}%';`
  );
}

async function getSearchUsernameById(id) {
  return await db.query(
    `SELECT id, username, picture_url FROM users WHERE id = $1;`,
    [id]
  );
}

export const searchRepository = {
  getSearch,
  getSearchUsernameById
}