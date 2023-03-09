import { Router } from 'express'
import { hashtagsValidate } from '../middlewares/hashtags.middleware.js'
import { getTrendingTopics, getHashtagByName } from '../controllers/hashtagsController.js'

const hashtagsRouter = Router()


hashtagsRouter.get('/hashtag', getTrendingTopics)
hashtagsRouter.get('/hashtag/:hashtag', hashtagsValidate, getHashtagByName)

export default hashtagsRouter