import { Document, Types } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserDocument extends IUser, Document<Types.ObjectId> {}
