import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity('Accounts')
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'numeric', default: 100})
    balance: number

}