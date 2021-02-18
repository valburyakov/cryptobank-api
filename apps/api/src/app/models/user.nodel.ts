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
