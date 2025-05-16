import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CoinPackage }  from './entity/CoinPackage';
import { UsreBalance }  from './entity/UsreBalance';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host:     process.env.DB_HOST       || 'localhost',
    port:     Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME   || 'root',
    password: process.env.DB_PASSWORD   || '',
    database: process.env.DB_DATABASE   || 'trade',
    synchronize: true,
    logging: true,
    entities: [CoinPackage, UsreBalance],
    subscribers: [],
    migrations: []
});