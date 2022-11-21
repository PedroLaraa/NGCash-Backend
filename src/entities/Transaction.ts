import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";

import { Account } from "./Account";

@Entity('Transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric'})
    value: number

    @ManyToOne(() => Account, (account) => account.id, {
        eager: true
    })
    @JoinColumn()
    creditedAccountId: number

    @ManyToOne(() => Account, (account) => account.id, {
        eager: true
    })
    @JoinColumn()
    debitedAccountId: number

    @CreateDateColumn({name: 'created_at'})
    'created_at': Date
}
