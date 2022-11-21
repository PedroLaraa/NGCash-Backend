import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { transactionRepository } from "../../repositories/transactionRepository";

export class GetTransaction {

    async getTransactions(req: Request, res: Response) {

        const userLogged = req.user;

        const accountLoggedUser = userLogged.accountId;

        if (!accountLoggedUser) {
            throw new BadRequestError("Faça login para continuar!");
        };

        const transaction = await transactionRepository.find({
            relations: {
                creditedAccountId: true
            }
        })

        const transactionCredit = transaction.filter(v => v.creditedAccountId)  

        return res.json(transactionCredit);
    };

}
