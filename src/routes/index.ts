import { Router } from 'express'
import { UserCreate } from '../controllers/user/UserCreate'
import { UserLogin } from '../controllers/user/UserLogin'
import { UserProfile } from '../controllers/user/UserProfile'
import { authMiddleware } from '../middlewares/authMiddleware'
// import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes
    .post('/user', new UserCreate().create)
    .post('/login', new UserLogin().login)
    .get('/profile', authMiddleware, new UserProfile().getProfile)

export default routes;