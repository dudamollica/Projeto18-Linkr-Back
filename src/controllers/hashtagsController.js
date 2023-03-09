import { queryGetHashtag } from '../repositories/hashtagsRepository.js'

export async function getHashtagByName(req, res) {
    const { rows } = res.locals.hashtags

    try {
        const body = rows.map(elm => {
            return {
                name: elm.name
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getTrendingTopics(req, res) {
    try {
        const { rows } = await queryGetHashtag()

        res.status(200).send(rows)
    } catch (error) {
        res.status(500).send(error)
    }
}