import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, ManyToOne } from "typeorm";

import { Account } from "./Account";

@Entity('Transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric'})
    value: number

    @ManyToOne(() => Account, (entity) => entity.id)
    @JoinColumn()
    creditedAccountId: number // FIX TYPE RELATION 

    @ManyToOne(() => Account, (entity) => entity.id)
    @JoinColumn()
    debitedAccountId: number

    @CreateDateColumn({name: 'created_at'})
    'created_at': Date
}
