import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

const PORT = process.env.PORT || 3000;

createConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('TypeORM connection error:', err));
