import { Types } from 'mongoose';
export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IToken {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

export interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
