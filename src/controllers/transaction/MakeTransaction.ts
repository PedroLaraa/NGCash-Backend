import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { accountRepository } from "../../repositories/accountRepository";

import { transactionRepository } from "../../repositories/transactionRepository";

import { userRepository } from "../../repositories/userRepository";

import { CreditAccount } from "./CreditAccount";

import { DebitAccount } from "./DebitAccount";

export class MakeTransaction {

    async transaction(req: Request, res: Response) {

        const userLogged = req.user;

        const accountLoggedUser = userLogged.accountId

        const { destinatario, valor } = req.body;

        const userExists = await userRepository.findOneBy({ username: destinatario });

        const dataAccount = await accountRepository.findOneBy({ id: accountLoggedUser })

        if (!accountLoggedUser) {
            return res.json({
                message: "Faça login para continuar!",
                sucess: false
            });
        };

        if (!userExists) {
            return res.json({
                message: "Destinatário informado inexistente!",
                sucess: false
            });
        };

        const destinatarioId = userExists.accountId

        if (userLogged.accountId === destinatarioId) {
            return res.json({
                message: "Você não pode transferir para você mesmo!",
                sucess: false
            });
        };

        if (!destinatario) {
            return res.json({
                message: "É necessário inserir o destinatário da transferência!",
                sucess: false
            });
        };

        if (!valor) {
            return res.json({
                message: "É necessário inserir o valor da transferência!",
                sucess: false
            });
        };

        if (!dataAccount) {
            return res.json({
                message: "Conta não encontrada!",
                sucess: false
            });
        };

        if (dataAccount.balance < valor) {
            return res.json({
                message: "Saldo insuficiente!",
                sucess: false
            });
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
