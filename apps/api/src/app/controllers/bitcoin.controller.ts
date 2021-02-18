import express from 'express';
import { bitcoinService } from '../usecases/bitcoin.service';
import { validateSchema } from '../validation/joi-middleware';
import { bitcoinUpdateSchema } from '../validation/schemas';

const router = express.Router();

router.put('/', validateSchema(bitcoinUpdateSchema), (req, res) => {
  const { price } = req.body;

  const updated = bitcoinService.update(price);

  res.json(updated);
});

router.get('/', (req, res) => {
  res.json(bitcoinService.getBitcoinInfo());
});

export default router;
