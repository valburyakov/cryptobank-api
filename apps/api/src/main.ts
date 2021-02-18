import express from 'express';
import bodyParser from 'body-parser';
import cls from 'cls-hooked';
import { v4 as uuid } from 'uuid';
import usersController from './app/controllers/users.controller';
import bitcoinController from './app/controllers/bitcoin.controller';
import { APP_ID } from './app/logger/logger.constants';
import { loggerService } from './app/logger/logger.service';

const app = express();
const clsNamespace = cls.createNamespace(APP_ID);

loggerService.log('APP INIT');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const traceId = uuid();
  clsNamespace.bind(req as any);
  clsNamespace.bind(res as any);
  clsNamespace.run(() => {
    loggerService.init(traceId);
    next();
  });
});

app.use('/api/users', usersController);
app.use('/api/bitcoin', bitcoinController);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  loggerService.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
