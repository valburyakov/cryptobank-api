import { User, UserInput } from '../models/user.nodel';
import { v4 as uuid } from 'uuid';

export class UsersRepository {
  users: User[] = [];

  findById(id: string): User {
    return this.users.find((user) => (user.id = id));
  }

  update(id: string, params: Partial<UserInput>) {
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
    const newUser = {
      ...params,
      id: uuid(),
      bitcoinAmount: 0,
      usdBalance: 100,
      createdAt: new Date(),
      updatedAt: null,
    };
    this.users.push(newUser);

    return newUser;
  }
}

export const usersRepository = new UsersRepository();
