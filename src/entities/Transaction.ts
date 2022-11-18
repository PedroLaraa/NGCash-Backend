import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from "typeorm";

import { Account } from "./Account";

@Entity('Transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric'})
    value: number

    @OneToOne(() => Account)
    @JoinColumn()
    creditedAccountId: number

    @OneToOne(() => Account)
    @JoinColumn()
    debitedAccountId: number

    @CreateDateColumn({name: 'created_at'})
    'created_at': Date
}