import { Router } from 'express'
import { GetTransaction } from '../controllers/transaction/GetTransaction'

import { MakeTransaction } from '../controllers/transaction/MakeTransaction'

import { UserCreate } from '../controllers/user/UserCreate'
import { UserLogin } from '../controllers/user/UserLogin'
import { UserProfile } from '../controllers/user/UserProfile'
import { authMiddleware } from '../middlewares/authMiddleware'


const routes = Router()

routes
    // Rotas de usuário
    .post('/user', new UserCreate().create)
    .post('/login', new UserLogin().login)
    .get('/profile', authMiddleware, new UserProfile().getProfile)
    // Rotas de transações
    .post('/transaction', authMiddleware, new MakeTransaction().transaction)
    .get('/transaction', authMiddleware, new GetTransaction().getTransactions)

export default routes;