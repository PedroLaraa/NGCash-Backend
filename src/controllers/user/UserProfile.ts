import { Request, Response } from "express";

import { BadRequestError, UnauthorizedError } from "../../helpers/api-erros";

import { userRepository } from "../../repositories/userRepository";

import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken";

type JwtPayload = {
    id: number
}

export class UserProfile {

    async getProfile(req: Request, res: Response) {

        return res.json(req.user);

    };

};
