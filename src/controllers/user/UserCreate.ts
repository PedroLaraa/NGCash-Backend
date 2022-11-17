import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { userRepository } from "../../repositories/userRepository";

import { validate } from "class-validator"

import bcrypt from 'bcrypt';

export class UserCreate {

    async create(req: Request, res: Response){
        const {username, password} = req.body

        const userExists = await userRepository.findOneBy({username})

        if(userExists) {
            throw new BadRequestError('User já utilizado!')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            username,
            password: hashPassword
        });

        const errors = await validate(newUser)

        if (errors.length > 0) {
            throw new Error(`Usuário ou senha inválidos!`)
        } else {
            await userRepository.save(newUser);
    
            return res.status(201).json(newUser)
        }

    }

}