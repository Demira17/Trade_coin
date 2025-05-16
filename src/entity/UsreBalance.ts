import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsreBalance {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    balance!: number;
}