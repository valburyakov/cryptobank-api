import { MoneyEntity } from './money.entity';

export class BitcoinEntity {
  constructor(
    private readonly _basePrice: MoneyEntity,
    private readonly _actionAmount: MoneyEntity
  ) {}

  get amount(): MoneyEntity {
    return this._actionAmount;
  }

  public calculateTotal(): MoneyEntity {
    return MoneyEntity.multiply(this._actionAmount, this._basePrice);
  }
}
