import { AppDataSource } from "../data-source";
import { Account } from "../entities/Account";

import { Transaction } from "../entities/Transaction";

export const transactionRepository = AppDataSource.getRepository(Transaction);
