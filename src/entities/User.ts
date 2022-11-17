import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

import { Account } from "./Account";

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', unique: true})
    @Length(3, 20)
    username: string
    
    @Column({type: 'text'})
    @Length(8, 14)
    password: string

    @OneToOne(() => Account )
    @JoinColumn()
    accountId: Account

}