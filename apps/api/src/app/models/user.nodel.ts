export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bitcoinAmount: number;
  usdBalance: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export type UserInput = Pick<User, 'name' | 'email' | 'username'>;

export function serializeUser(user: User) {
  return {
    ...user,
    updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
    createdAt: user.createdAt.toISOString(),
  };
}
