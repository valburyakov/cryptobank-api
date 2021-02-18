import express from 'express';
import { usersRepository } from '../data/users.repository';
import { transferMoneyService } from '../usecases/transfer-money.service';
import { bitcoinService } from '../usecases/bitcoin.service';
import { loggerService } from '../logger/logger.service';

const router = express.Router();

router.post('/', (req, res) => {
  // Validate user input
  const { name, username, email } = req.body;

  loggerService.log('POST Users started', 'Users Controller');

  const createdUser = usersRepository.add({
    name,
    username,
    email,
  });

  res.json(createdUser);
});

router.use('/:id', (req, res, next) => {
  loggerService.log(`UserId middleware: checking user`, 'Users Controller');

  const user = usersRepository.findById(req.params.id);

  if (user) {
    loggerService.log(`User ${req.params.id} found`, 'Users Controller');
    next();
  } else {
    loggerService.error(`User ${req.params.id} not found`);
    res.status(404).send({ message: 'User not found' });
  }
});

router.post('/:id/usd', (req, res) => {
  // validate req.body params
  const { amount, action } = req.body;

  loggerService.log(
    `POST users/usd started: ${action} ${amount}$`,
    'Users Controller'
  );

  try {
    const updated =
      action === 'deposit'
        ? transferMoneyService.deposit(req.params.id, amount)
        : transferMoneyService.withdraw(req.params.id, amount);

    res.json(updated);
  } catch (e) {
    res.status(403).send({ message: e.message });
  }
});

router.post('/:id/bitcoins', (req, res) => {
  // validate req.body params
  const { amount, action } = req.body;

  loggerService.log(
    `POST users/bitcoins started: ${action} ${amount}$`,
    'Users Controller'
  );

  try {
    const updated =
      action === 'buy'
        ? bitcoinService.buy(req.params.id, amount)
        : bitcoinService.sell(req.params.id, amount);

    res.json(updated);
  } catch (e) {
    res.status(403).send({ message: e.message });
  }
});

router.get('/:id/balance', (req, res) => {
  loggerService.log(`Get users/balance started`, 'Users Controller');

  const balance = bitcoinService.calculateBalance(req.params.id);

  res.json({
    balance,
  });
});

router.put('/:id', (req, res) => {
  // Validate params
  const { name, username, email } = req.body;

  usersRepository.update(req.params.id, {
    name,
    username,
    email,
  });

  const user = usersRepository.findById(req.params.id);

  res.json(user);
});

router.get('/:id', (req, res) => {
  const user = usersRepository.findById(req.params.id);

  res.send(user);
});

export default router;
