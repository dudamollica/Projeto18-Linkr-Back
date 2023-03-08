import { Router } from 'express'
import { hashtagsValidate } from '../middlewares/hashtags.middleware.js'

const hashtagsRouter = Router()

hashtagsRouter.get('/hashtag/:hashtag', hashtagsValidate)

export default hashtagsRouter