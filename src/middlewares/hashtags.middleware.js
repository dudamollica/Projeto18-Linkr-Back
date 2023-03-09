import { queryAtHastagTable } from '../repositories/hashtagsRepository.js'
import { STATUS_CODE } from "../enums/statusCode.js";

export async function hashtagsValidate(req, res, next) {
    const { hashtag } = req.params

    try {
        const { rowCount } = await queryAtHastagTable(hashtag)

        if (!rowCount > 0) return res.sendStatus(STATUS_CODE.NO_CONTENT)

        res.locals.hashtags = hashtag

    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error)
    }

    next()
}