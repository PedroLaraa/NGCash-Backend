import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { transactionRepository } from "../../repositories/transactionRepository";

import bcrypt from 'bcrypt';

import  jwt  from "jsonwebtoken";

export class MakeTransaction {

    async transaction(req: Request, res: Response){

        const userLogged = req.user;

        const {destinatario, valor} = req.body;
        
        console.log(userLogged);

        console.log(destinatario, valor);

        return res.json(userLogged);

    };

};
