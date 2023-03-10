import { db } from "../config/database.js";
import { TABLE } from "../enums/tables.js";

export async function findUserIdbyToken(token){
    return db.query(
        `SELECT "user_id" FROM ${TABLE.SESSIONS} WHERE token = $1`,
        [token]
    );
}

export async function getAllPosts(){
    return db.query(
        `SELECT
            user_id, username, picture_url, url, post_text 
         FROM ${TABLE.POSTS} 
         JOIN ${TABLE.USERS}
            ON users.id = posts.user_id
         ORDER BY posts.id DESC LIMIT 20`
    );
}

export async function insertPost(user_id, url, post_text){

    return db.query(
        `INSERT INTO ${TABLE.POSTS} (user_id, url, post_text, created_at, hashtag_id) VALUES ($1, $2, $3, NOW())`,
        [user_id, url, post_text]
    );
}
