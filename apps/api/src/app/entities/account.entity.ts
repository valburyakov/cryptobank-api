import { MoneyEntity } from './money.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _baseLineBalance: MoneyEntity
  ) {}

  get id(): AccountId {
    return this._id;
  }

  get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }

  public withdraw(money: MoneyEntity): null | MoneyEntity {
    if (!this._mayWithdrawMoney(money)) {
      return null;
    }

    return MoneyEntity.minus(this.baseLineBalance, money);
  }

  public deposit(money: MoneyEntity) {
    return MoneyEntity.add(this.baseLineBalance, money);
  }

  private _mayWithdrawMoney(money: MoneyEntity) {
    return MoneyEntity.add(
      this.baseLineBalance,
      money.negate()
    ).isPositiveOrZero();
  }
}
