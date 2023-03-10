import * as timelineRepository from "../repositories/timelineRepository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getPosts(req, res){
    try{
        const posts = await timelineRepository.getAllPosts();
        return res.send(posts.rows)
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err.message);
    }
}

export async function postPublish(req, res){
    const { url, post_text } = req.body;
    const token = (req.headers.authorization).replace('Bearer ', '');
    if(!token) return res.send("cu")

    try{
        const id = await timelineRepository.findUserIdbyToken(token);
        if(!id.rows[0]) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        const user_id = id.rows[0].user_id;
        console.log(user_id)

        const { rowCount } = await timelineRepository.insertPost(
            user_id,
            url,
            post_text
        );

        if (rowCount === 1) return res.sendStatus(STATUS_CODE.CREATED);

    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err.message);
    }
}