import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class CoinPackage {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    amount!: number

    @Column('decimal')
    priceEUR!: number

    @Column('decimal')
    priceUSD!: number

    @Column('int')
    bonusPercent!: number
}
