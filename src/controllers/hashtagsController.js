import { queryGetHashtag, queryGetPostByHashtag } from '../repositories/hashtagsRepository.js'
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getHashtagByName(req, res) {
    const { hashtags } = res.locals

    try {
        const { rows } = await queryGetPostByHashtag(hashtags)
        res.status(STATUS_CODE.OK).send(rows)
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error)
    }
}

export async function getTrendingTopics(req, res) {
    try {
        const { rows } = await queryGetHashtag()

        res.status(STATUS_CODE.OK).send(rows)
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error)
    }
}