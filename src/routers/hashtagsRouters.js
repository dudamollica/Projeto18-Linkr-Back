import { Router } from 'express'
import { hashtagsValidate } from '../middlewares/hashtags.middleware.js'
import { getTrendingTopics } from '../controllers/hashtagsController.js'

const hashtagsRouter = Router()


hashtagsRouter.get('/hashtag', getTrendingTopics)
hashtagsRouter.get('/hashtag/:hashtag', hashtagsValidate)

export default hashtagsRouter