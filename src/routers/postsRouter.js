import { Router } from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { likePost, amountOfLikes, deletePost, editPost} from '../controllers/postController.js'

const postsRouter = Router()

postsRouter.post('/posts/like/:id', authenticateUser, likePost)
postsRouter.get ('/posts/like/:id', authenticateUser, amountOfLikes)
postsRouter.delete ('/posts/like/:id', authenticateUser, deletePost)

export default postsRouter