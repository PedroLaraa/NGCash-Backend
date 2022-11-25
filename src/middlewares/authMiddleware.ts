import { Request, Response, NextFunction } from "express";

import { JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../helpers/api-erros";

import { userRepository } from "../repositories/userRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.json('Não autorizado!');
    };

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const userExists = await userRepository.findOneBy({ id });

    if (!userExists) {
        return res.json('Não autorizado!');
    };

    const { password: _, ...loggedUser } = userExists;

    req.user = loggedUser

    next();

}