import { db } from "../config/database.js";

export async function queryAtHastagTable(hashtag) {
    return await db.query(`
    SELECT *
    FROM hashtags
    WHERE name = $1
    `, [hashtag])
}

export async function queryGetHashtag() {
    return await db.query(`
    SELECT name,
    COUNT (name) AS Total 
    FROM hashtags
    GROUP BY name
    ORDER BY count(name) DESC
    LIMIT 10
    `)
}


