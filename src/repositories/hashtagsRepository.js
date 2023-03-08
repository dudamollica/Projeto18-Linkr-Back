import { db } from "../config/database.js";

export async function queryAtHastagTable(hashtag) {
    return await db.query(`
    SELECT *
    FROM hashtags
    WHERE name = $1
    `, [hashtag])
}

