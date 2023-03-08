import { queryAtHastagTable } from '../repositories/hashtagsRepository.js'

export async function hashtagsValidate(req, res, next) {
    const { hashtag } = req.params

    try {
        const { rowCount, rows } = await queryAtHastagTable(hashtag)

        if (!rowCount > 0) return res.sendStatus(204)

        res.locals.hashtags = rows

    } catch (error) {
        res.status(500).send(error)
    }

    next()
}