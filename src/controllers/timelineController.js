import * as timelineRepository from "../repositories/timelineRepository.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res){
    try{
        const { userInfo } = res.locals
        const userId = userInfo//.user_id
        const { rows: posts } = await timelineRepository.getAllPosts();
        const metadataPosts = await Promise.all(
            posts.map(async ({ id, likes, username, photo, url, post, userId }) => {
                const like = parseInt(likes);
                const metadata = await urlMetadata(url);
                return {
                    id,
                    username,
                    photo,
                    url,
                    post,
                    like,
                    userId,
                    title: metadata.title,
                    image: metadata.image,
                    description: metadata.description,
                };
            }
                )
            );
            const result = {
            metadataPosts,
            userId}
 console.log(result);
            res.status(200).send(result);
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