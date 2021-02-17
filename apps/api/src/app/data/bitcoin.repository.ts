import { Bitcoin } from '../models/bitcoin.model';

export class BitcoinRepository {
  private _bitcoin: Bitcoin = {
    price: 100,
    updatedAt: new Date(),
  };

  get bitcoin(): Bitcoin {
    return this._bitcoin;
  }

  getPrice(): number {
    return this._bitcoin.price;
  }

  updatePrice(price: number) {
    this._bitcoin = {
      price,
      updatedAt: new Date(),
    };
  }
}

export const bitcoinRepository = new BitcoinRepository();
