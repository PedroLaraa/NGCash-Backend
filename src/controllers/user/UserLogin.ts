import { Request, Response } from "express";

import { BadRequestError, UnauthorizedError } from "../../helpers/api-erros";

import { userRepository } from "../../repositories/userRepository";

import bcrypt from 'bcrypt';

import  jwt  from "jsonwebtoken";

export class UserLogin {

    async login(req: Request, res: Response){
        
        const {username, password} = req.body;

        const user = await userRepository.findOneBy({username});

        if(!user) {
            return res.json({
                message: 'Usuário e/ou senha inválidos!',
                auth: false
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if(!verifyPassword){
            return res.json({
                message: 'Usuário e/ou senha inválidos!',
                auth: false
            })
        };

        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '24h'});

        const {password:_, ...userLogin} = user;

        return res.json({
            user: userLogin,
            accountId: userLogin.accountId,
            token: token,
            auth: true
        });

    };

};
