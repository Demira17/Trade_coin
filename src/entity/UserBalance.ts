import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class UserBalance {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('int')
    balance!: number

    @Column({ nullable: true })
    cardNumber?: string

    @Column({ nullable: true })
    cardHolderName?: string

    @Column({ nullable: true })
    cardCountry?: string
}
