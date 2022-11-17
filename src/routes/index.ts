import { Router } from 'express'
import { UserCreate } from '../controllers/user/UserCreate'
import { UserLogin } from '../controllers/user/UserLogin'
// import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes
    .post('/user', new UserCreate().create)
    .post('/login', new UserLogin().login)

export default routes;