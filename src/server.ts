import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import app from './app';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: []
})
    .initialize()
    .then(() => {
        console.log('✅ Database connected, syncing schemas…');
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    });
