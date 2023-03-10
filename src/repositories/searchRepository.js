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

async function getSearchPostById(id) {
  return await db.query(
    `SELECT COUNT(likes.post_id) AS likes, posts.id, users.username, 
    users.picture_url AS photo, posts.url, posts.post_text AS post, 
    posts.user_id AS "userId" 
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    LEFT JOIN likes
    ON likes.post_id = posts.id
    WHERE posts.user_id = $1
    GROUP BY ( posts.id, users.username, users.picture_url, 
    posts.url, posts.post_text, posts.user_id)
    ORDER BY id DESC
    LIMIT 20;
    `,
    [id]
);
}

export const searchRepository = {
  getSearch,
  getSearchUsernameById,
  getSearchPostById
}

