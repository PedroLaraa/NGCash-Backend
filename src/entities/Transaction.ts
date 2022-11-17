import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

import { Account } from "./Account";

@Entity('Transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric'})
    value: number

    @OneToOne(() => Account)
    @JoinColumn()
    creditedAccountId: Account

    @OneToOne(() => Account)
    @JoinColumn()
    debitedAccountId: Account
}