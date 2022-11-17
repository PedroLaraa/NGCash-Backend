import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { userRepository } from "../../repositories/userRepository";

import bcrypt from 'bcrypt';

import  jwt  from "jsonwebtoken";

export class UserLogin {

    async login(req: Request, res: Response){
        
        const {username, password} = req.body

        const user = await userRepository.findOneBy({username})

        if(!user) {
            throw new BadRequestError('Usuário e/ou senha inválidos!')
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword){
            throw new BadRequestError('Usuário e/ou senha inválidos!')
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '24h'})

        

    }

}
