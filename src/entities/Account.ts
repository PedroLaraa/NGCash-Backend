
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Transaction } from "./Transaction";

@Entity('Accounts')
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric', default: 100})
    balance: number

}