import { usersRepository, UsersRepository } from '../data/users.repository';
import {
  bitcoinRepository,
  BitcoinRepository,
} from '../data/bitcoin.repository';
import { Bitcoin } from '../models/bitcoin.model';
import { MoneyEntity } from '../entities/money.entity';
import {
  NotEnoughBitcoinsException,
  NotEnoughMoneyException,
} from '../errors/custom-errors';
import { BitcoinEntity } from '../entities/bitcoin.entity';
import { AccountEntity } from '../entities/account.entity';
import { User } from '../models/user.nodel';

export class BitcoinService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bitcoinRepository: BitcoinRepository
  ) {}

  getBitcoinInfo(): Bitcoin {
    return this.bitcoinRepository.bitcoin;
  }

  update(price: number): Bitcoin {
    this.bitcoinRepository.updatePrice(price);
    return this.bitcoinRepository.bitcoin;
  }

  buy(userId: string, amount: number): User {
    const user = this.usersRepository.findById(userId);
    const bitcoin = this.bitcoinRepository.bitcoin;

    const bitcoinOperation = new BitcoinEntity(
      MoneyEntity.of(bitcoin.price),
      MoneyEntity.of(amount)
    );

    const bitcoinBuyPrice = bitcoinOperation.calculateTotal();

    const balanceAfterBuy = MoneyEntity.minus(
      MoneyEntity.of(user.usdBalance),
      bitcoinBuyPrice
    );

    if (balanceAfterBuy.isPositiveOrZero()) {
      user.usdBalance = balanceAfterBuy.amount.toNumber();
      user.bitcoinAmount = MoneyEntity.add(
        MoneyEntity.of(user.bitcoinAmount),
        bitcoinOperation.amount
      ).amount.toNumber();
      user.updatedAt = new Date();
      return user;
    } else {
      throw new NotEnoughMoneyException('Not enough money to buy');
    }
  }

  sell(userId: string, amount: number): User {
    const user = this.usersRepository.findById(userId);
    const bitcoin = this.bitcoinRepository.bitcoin;

    const bitcoinOperation = new BitcoinEntity(
      MoneyEntity.of(bitcoin.price),
      MoneyEntity.of(amount)
    );

    const bitcoinSellPrice = bitcoinOperation.calculateTotal();

    const bitcoinAfterSell = MoneyEntity.minus(
      MoneyEntity.of(user.bitcoinAmount),
      bitcoinOperation.amount
    );

    if (bitcoinAfterSell.isPositiveOrZero()) {
      user.usdBalance = MoneyEntity.add(
        MoneyEntity.of(user.usdBalance),
        bitcoinSellPrice
      ).amount.toNumber();
      user.bitcoinAmount = bitcoinAfterSell.amount.toNumber();
      user.updatedAt = new Date();
      return user;
    } else {
      throw new NotEnoughBitcoinsException('Not enough bitcoins to sell');
    }
  }

  calculateBalance(userId: string): number {
    const user = this.usersRepository.findById(userId);
    const bitcoin = this.bitcoinRepository.bitcoin;

    const bitcoinOperation = new BitcoinEntity(
      MoneyEntity.of(bitcoin.price),
      MoneyEntity.of(user.bitcoinAmount)
    );

    const total = MoneyEntity.add(
      MoneyEntity.of(user.usdBalance),
      bitcoinOperation.calculateTotal()
    );

    return total.amount.toNumber();
  }
}

export const bitcoinService = new BitcoinService(
  usersRepository,
  bitcoinRepository
);
