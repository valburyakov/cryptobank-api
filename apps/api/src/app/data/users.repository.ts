import { User, UserInput } from '../models/user.nodel';
import { v4 as uuid } from 'uuid';
import { loggerService } from '../logger/logger.service';

export class UsersRepository {
  users: User[] = [];

  findById(id: string): User {
    return this.users.find((user) => (user.id = id));
  }

  update(id: string, params: Partial<UserInput>) {
    loggerService.log(`Updating user ${id}`, 'Users Repository');

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: params.name ?? user.name,
          username: params.username ?? user.username,
          email: params.email ?? user.email,
          updatedAt: new Date(),
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
      usdBalance: 100,
      createdAt: new Date(),
      updatedAt: null,
    };
    this.users.push(newUser);

    loggerService.log(`User added ${newUser.id}`, 'Users Repository');

    return newUser;
  }
}

export const usersRepository = new UsersRepository();
