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
import { User } from '../models/user.nodel';
import { loggerService } from '../logger/logger.service';

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
    loggerService.log(
      `Buying ${amount} bitcoins for ${userId}`,
      'BitcoinService'
    );

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
      user.usdBalance = balanceAfterBuy.toNumber();
      user.bitcoinAmount = MoneyEntity.add(
        MoneyEntity.of(user.bitcoinAmount),
        bitcoinOperation.amount
      ).toNumber();

      this.usersRepository.save(user);

      return user;
    } else {
      throw new NotEnoughMoneyException('Not enough money to buy');
    }
  }

  sell(userId: string, amount: number): User {
    loggerService.log(
      `Selling ${amount} bitcoins for ${userId}`,
      'BitcoinService'
    );

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
      ).toNumber();
      user.bitcoinAmount = bitcoinAfterSell.toNumber();

      this.usersRepository.save(user);

      return user;
    } else {
      throw new NotEnoughBitcoinsException('Not enough bitcoins to sell');
    }
  }

  calculateBalance(userId: string): number {
    loggerService.log(`Calculating balance`, 'BitcoinService');

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

    return total.toNumber();
  }
}

export const bitcoinService = new BitcoinService(
  usersRepository,
  bitcoinRepository
);
