import { Document, Types } from 'mongoose';

export interface IUser {
  email: string;
  socketId: string | null;
  firstName: string;
  lastName: string;
  password: string;
  reAuth?: boolean;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserDocument extends IUser, Document<Types.ObjectId> {}
