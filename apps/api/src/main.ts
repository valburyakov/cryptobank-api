import express from 'express';
import bodyParser from 'body-parser';
import usersController from './app/controllers/users.controller';
import bitcoinController from './app/controllers/bitcoin.controller';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', usersController);
app.use('/api/bitcoin', bitcoinController);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
