import { User, UserInput } from '../models/user.nodel';
import { v4 as uuid } from 'uuid';
import { loggerService } from '../logger/logger.service';

export class UsersRepository {
  users: User[] = [];

  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    return user ? { ...user } : undefined;
  }

  save(updatedUser: User) {
    loggerService.log(`Saving user ${updatedUser.id}`, 'Users Repository');

    updatedUser.updatedAt = new Date();

    this.users = this.users.map((user) => {
      if (user.id === updatedUser.id) {
        return {
          ...updatedUser,
        };
      }
      return user;
    });
  }

  add(params: UserInput): User {
    loggerService.log(
      `Adding new user ${JSON.stringify(params)}`,
      'Users Repository'
    );

    const newUser = {
      ...params,
      id: uuid(),
      bitcoinAmount: 0,
      usdBalance: 0,
      createdAt: new Date(),
      updatedAt: null,
    };
    this.users.push(newUser);

    loggerService.log(`User added ${newUser.id}`, 'Users Repository');

    return newUser;
  }
}

export const usersRepository = new UsersRepository();
