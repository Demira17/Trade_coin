import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';
import errorHandler from './middleware/Error';

// 1) Create the Express instance
const app: Express = express();

// 2) Serve anything in ../public as static, and allow index.html at "/"
app.use( express.static(path.join(__dirname, '..', 'public')) );

// 3) CORS + JSON parsing for your API
app.use(cors());
app.use(bodyParser.json());

// 4) Mount your API routes under /api
app.use('/api', routes);

// 5) Fallback error‐handler for your API
app.use(errorHandler);

export default app;
