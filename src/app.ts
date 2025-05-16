import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;
