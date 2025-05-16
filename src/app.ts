import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';
import errorHandler from './middleware/Error';

const app: Express = express();

app.use( express.static(path.join(__dirname, '..', 'public')) );

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.use(errorHandler);

export default app;
