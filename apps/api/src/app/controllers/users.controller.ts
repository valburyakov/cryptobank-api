import express from 'express';
import { usersRepository } from '../data/users.repository';
import { transferMoneyService } from '../usecases/transfer-money.service';
import { bitcoinService } from '../usecases/bitcoin.service';
import { loggerService } from '../logger/logger.service';
import { validateSchema } from '../validation/joi-middleware';
import {
  bitcoinSchema,
  updateUserSchema,
  usdSchema,
  userSchema,
} from '../validation/schemas';

const router = express.Router();

router.post('/', validateSchema(userSchema), (req, res) => {
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

router.post('/:id/usd', validateSchema(usdSchema), (req, res) => {
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
    loggerService.error(
      `Failed to ${action} ${amount}$`,
      e.message,
      'Users Controller'
    );
    res.status(403).send({ message: e.message });
  }
});

router.post('/:id/bitcoins', validateSchema(bitcoinSchema), (req, res) => {
  const { amount, action } = req.body;

  loggerService.log(
    `POST users/bitcoins started: ${action} ${amount}`,
    'Users Controller'
  );

  try {
    const updated =
      action === 'buy'
        ? bitcoinService.buy(req.params.id, amount)
        : bitcoinService.sell(req.params.id, amount);

    res.json(updated);
  } catch (e) {
    loggerService.error(
      `Failed to ${action} ${amount} bitcoins`,
      e.message,
      'Users Controller'
    );
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

router.put('/:id', validateSchema(updateUserSchema), (req, res) => {
  const { name, username, email } = req.body;

  const user = usersRepository.findById(req.params.id);

  user.name = name ?? user.name;
  user.username = username ?? user.username;
  user.email = email ?? user.email;

  usersRepository.save(user);

  res.json(user);
});

router.get('/:id', (req, res) => {
  const user = usersRepository.findById(req.params.id);

  res.json(user);
});

export default router;
