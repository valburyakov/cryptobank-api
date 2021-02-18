import { Bitcoin } from '../models/bitcoin.model';
import { loggerService } from '../logger/logger.service';

export class BitcoinRepository {
  private _bitcoin: Bitcoin = {
    price: 100,
    updatedAt: new Date(),
  };

  get bitcoin(): Bitcoin {
    return this._bitcoin;
  }

  updatePrice(price: number) {
    loggerService.log(
      `Updating bitcoin price to ${price}`,
      'Bitcoin Repository'
    );

    this._bitcoin = {
      price,
      updatedAt: new Date(),
    };
  }
}

export const bitcoinRepository = new BitcoinRepository();
