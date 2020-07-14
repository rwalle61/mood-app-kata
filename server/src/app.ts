import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import handleErrors from './middleware/errorHandler';
import v1Routes from './v1/routes';

require('express-async-errors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/', v1Routes);
app.use(
  '/',
  express.static(path.join(__dirname, '..', '..', 'client', 'build')),
);
app.use(handleErrors);

export default app;
