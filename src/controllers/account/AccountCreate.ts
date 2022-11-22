import { Request, Response } from "express";

import { accountRepository } from "../../repositories/accountRepository";

export class AccountCreate {

    async create(req: Request, res: Response) {

        const newAccount = accountRepository.create({
            balance: 100
        });

        await accountRepository.save(newAccount);

        return res.status(201).json(newAccount)

    }

}