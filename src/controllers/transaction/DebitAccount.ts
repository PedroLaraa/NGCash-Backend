import { Request, Response } from "express";

import { BadRequestError, UnauthorizedError } from "../../helpers/api-erros";

import { accountRepository } from "../../repositories/accountRepository";

export class DebitAccount {

    async transaction(debit: number, idUserAccount: number, req: Request, res: Response){

        const dataAccount = await accountRepository.findOneBy({id: idUserAccount})

        if(!dataAccount){
            throw new BadRequestError("Conta não encontrada!");
        };

        const balance = dataAccount.balance;

        const newBalance = Number(balance) - Number(debit) ;

        const dataDebit = accountRepository.create({
            id: idUserAccount,
            balance: newBalance
        });

        return await accountRepository.save(dataDebit);

    };

};
