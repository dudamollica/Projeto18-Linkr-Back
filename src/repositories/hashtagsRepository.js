import db from "../config/database.js";

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

export async function queryGetPostByHashtag(hashtag) {
    return await db.query(`
    SELECT name AS hashtag_title, posts_id, posts.* 
    FROM hashtags 
    JOIN posts 
    ON posts_id = posts.id 
    WHERE name = $1;
    `, [hashtag])
}


