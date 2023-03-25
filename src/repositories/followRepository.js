import db from "../config/database.js";

async function postFollow(userId, followedId) {
    return await db.query(`INSERT INTO "followed" (user_id, followed_id) VALUES ($1,$2)`, [userId, followedId])
}

async function postUnfollow(userId, followedId){
    return await db.query(`DELETE FROM  "followed" WHERE user_id=$1 AND followed_user_id=$2`, [userId, followedId])
}

async function getFollow(userId, followedId){
    return await db.query(`SELECT * FROM "followed" WHERE user_id=$1 AND followed_user_id=$2`, [userId, followedId])
}

async function getFollowed(userId) {
    return await db.query(`SELECT * FROM "followed" WHERE user_id=$1`, [userId])
}

export const searchRepository = {
    postFollow,
    postUnfollow,
    getFollow,
    getFollowed,
  }