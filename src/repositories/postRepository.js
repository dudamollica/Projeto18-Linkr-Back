import db from "../config/database.js";

export async function addLike({ id, userId }) {
  return await db.query(
    `INSERT INTO likes (post_id, user_id) VALUES (${id}, ${userId})`
  );
}

export async function sumLikesAmount(post_id) {
  return await db.query(`SELECT count(*) FROM likes WHERE post_id=${post_id}`);
}

export async function postCreator(post_id) {
  return await db.query(`SELECT (user_id) FROM posts WHERE id=${post_id}`);
}


export async function postDelete(post_id) {
  return await db.query(`DELETE FROM posts WHERE id=${post_id}`);
}
