import express from 'express';
import { usersRepository } from '../data/users.repository';
import { serializeUser } from '../models/user.nodel';
import { transferMoneyService } from '../usecases/transfer-money.service';
import { bitcoinService } from '../usecases/bitcoin.service';

const router = express.Router();

router.post('/', (req, res) => {
  // Validate user input
  const { name, username, email } = req.body;

  const createdUser = usersRepository.add({
    name,
    username,
    email,
  });

  res.json({ ...createdUser });
});

router.post('/:id/usd', (req, res) => {
  // validate req.body params
  const { amount, action } = req.body;

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

  if (user) {
    res.json({ ...serializeUser(user) });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

router.get('/:id', (req, res) => {
  const user = usersRepository.findById(req.params.id);

  if (user) {
    res.send({
      ...serializeUser(user),
    });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

export default router;
