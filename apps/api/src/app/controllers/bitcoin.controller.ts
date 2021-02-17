import express from 'express';
import { bitcoinService } from '../usecases/bitcoin.service';

const router = express.Router();

router.put('/', (req, res) => {
  const { price } = req.body;

  const updated = bitcoinService.update(price);

  res.json(updated);
});

router.get('/', (req, res) => {
  res.json(bitcoinService.getBitcoinInfo());
});

export default router;
