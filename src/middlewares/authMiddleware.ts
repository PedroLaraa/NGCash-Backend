import { Request, Response, NextFunction } from "express";

import { JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.json('Não autorizado!');
    };

    jwt.verify(authorization.split(' ')[1], process.env.JWT_PASS ?? '', function(err, decoded){
        if(err){
            return res.json({
                message: 'Token de sessão expirado! Faça Logout e depois Login!',
                auth: false
            })
        }
    })

    const token = authorization.split(' ')[1];

    // FIXME JWT EXPIRA, CRASHA O APP E NÃO RETORNA NADA PARA FRONT


    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;


    const userExists = await userRepository.findOneBy({ id });

    if (!userExists) {
        return res.json('Não autorizado!');
    };

    const { password: _, ...loggedUser } = userExists;

    req.user = loggedUser

    next();

}