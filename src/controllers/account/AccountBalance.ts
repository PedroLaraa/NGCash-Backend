import { Request, Response } from "express";

import { BadRequestError } from "../../helpers/api-erros";

import { accountRepository } from "../../repositories/accountRepository";

export class AccountBalance {

    async balance(req: Request, res: Response) {

        const userLogged = req.user;

        const accountLoggedUser = userLogged.accountId;

        if (!accountLoggedUser) {
            throw new BadRequestError("Faça login para continuar!");
        };

        const balance = await accountRepository.findOneBy({id: accountLoggedUser});

        return res.json(balance);

    }

}