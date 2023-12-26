import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum SexEnum{
    Male = 'male',
    Female = 'female'
}

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable:true})
    surname: string

    @Column({unique:true})
    email: string

    @Column()
    password:string

    @Column({nullable:true})
    sex: SexEnum

    @Column({nullable:true})
    photo:string

    @CreateDateColumn()
    registrationDate : Date
}