import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { accountRepository } from "../../repositories/accountRepository";

import { transactionRepository } from "../../repositories/transactionRepository";

import { userRepository } from "../../repositories/userRepository";

import { CreditAccount } from "./CreditAccount";

import { DebitAccount } from "./DebitAccount";

export class MakeTransaction {

    async transaction(req: Request, res: Response){

        const userLogged = req.user;

        const accountLoggedUser = userLogged.accountId

        const {destinatario, valor} = req.body;

        const userExists = await userRepository.findOneBy({username: destinatario});

        const dataAccount = await accountRepository.findOneBy({id: accountLoggedUser})

        if(!accountLoggedUser){
            throw new BadRequestError("Faça login para continuar!");
        };

        if(!userExists){
            throw new BadRequestError("Destinatário informado inexistente!");
        };

        const destinatarioId = userExists.accountId

        if(userLogged.accountId === destinatarioId){
            throw new BadRequestError("Você não pode transferir para você mesmo!");
        };

        if(!destinatario){
            throw new BadRequestError("É necessário inserir o destinatário da transferência!");
        };

        if(!valor){
            throw new BadRequestError("É necessário inserir o valor da transferência!");
        };

        if(!dataAccount){
            throw new BadRequestError("Conta não encontrada!");
        };

        if(dataAccount.balance < valor){
            throw new BadRequestError("Saldo insuficiente!");
        };

        const transactionData = transactionRepository.create({
            debitedAccountId: userLogged.accountId, 
            creditedAccountId: destinatarioId,
            value: valor
        });

        new DebitAccount().transaction(valor, accountLoggedUser, req, res)

        new CreditAccount().transaction(valor, destinatarioId, req, res)

        await transactionRepository.save(transactionData);

        return res.json(transactionData);

    };

};
