import * as timelineRepository from "../repositories/timelineRepository.js";
import { STATUS_CODE } from "../enums/statusCode";

export async function postPublish(req, res){
    const { url, post_text } = req.body;
    const token = (req.headers.authorization).replace('Bearer ', '');

    try{
        const user_id = await timelineRepository.findUserIdbyToken(token);
        if(!user_id.rows[0]) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        const { rowCount } = await timelineRepository.insertPost(
            user_id,
            url,
            post_text
        )


    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err.message);
    }
}