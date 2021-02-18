import { usersRepository, UsersRepository } from '../data/users.repository';
import { AccountEntity } from '../entities/account.entity';
import { MoneyEntity } from '../entities/money.entity';
import { NotEnoughMoneyException } from '../errors/custom-errors';
import { loggerService } from '../logger/logger.service';

export class TransferMoneyService {
  constructor(private readonly usersRepository: UsersRepository) {}

  deposit(userId: string, amount: number) {
    loggerService.log(`Making deposit for ${userId}`, 'TransferMoneyService');

    const user = this.usersRepository.findById(userId);
    const account = new AccountEntity(user.id, MoneyEntity.of(user.usdBalance));

    // update user balance
    user.usdBalance = account.deposit(MoneyEntity.of(amount)).amount.toNumber();
    user.updatedAt = new Date();

    return user;
  }

  withdraw(userId: string, amount: number) {
    loggerService.log(`Making withdraw for ${userId}`, 'TransferMoneyService');

    const user = this.usersRepository.findById(userId);
    const account = new AccountEntity(user.id, MoneyEntity.of(user.usdBalance));

    const updated = account.withdraw(MoneyEntity.of(amount));

    if (!updated) {
      throw new NotEnoughMoneyException('Not enough money');
    }

    user.usdBalance = updated.amount.toNumber();
    user.updatedAt = new Date();

    return user;
  }
}

export const transferMoneyService = new TransferMoneyService(usersRepository);
