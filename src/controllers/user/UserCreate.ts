import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { userRepository } from "../../repositories/userRepository";

import { validate } from "class-validator"

import bcrypt from 'bcrypt';
import { accountRepository } from "../../repositories/accountRepository";

export class UserCreate {

    async create(req: Request, res: Response){
        const {username, password} = req.body

        const userExists = await userRepository.findOneBy({username})

        var regex = /^(?=(?:.*?[0-9]){1})(?=(?:.*?[A-Z]){1})/
        
        if(userExists) {
            return res.json({
                message: 'User já utilizado!',
                sucess: false
        })
        }

        if(username.length < 3){
            return res.json({
                message: 'Usuário deve conter ao menos 3 caracteres',
                sucess: false
            })
        }

        if(password.length < 8){
            return res.json({
                message:'Senha deve conter pelo menos 8 caracteres!',
                sucess: false
            })
        }else if(!regex.exec(password)){
            return res.json({
                message: 'Senha deve conter pelo menos 1 número e 1 letra maiúscula!',
                sucess: false
        })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            username,
            password: hashPassword
        });

        const errors = await validate(newUser)

        const newAccount = accountRepository.create({
            balance: 100
        });

        if (errors.length > 0) {
            return res.json({
                message: `Usuário ou senha inválidos!`,
                sucess: false
            })
        } else {

            await accountRepository.save(newAccount);

            const accId = newAccount.id

            const user = userRepository.create({
                username,
                password: hashPassword,
                accountId: accId
            })

            await userRepository.save(user);

            return res.status(201).json(newUser)
        }

    }

}