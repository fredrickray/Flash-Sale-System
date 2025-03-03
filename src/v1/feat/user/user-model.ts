import bcrypt from 'bcryptjs';
import { PaginateModel, Schema, model } from 'mongoose';
import { IUserDocument, IUser } from './user-type';
import Config from '@config/dotenv-config';
import { ServerError } from '@middlewares/error-middleware';
const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    socketId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String },
    reAuth: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, Config.BcryptSalt);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const user = this as IUser;
    return bcrypt.compare(candidatePassword, user.password);
  } catch (error: any) {
    throw new ServerError('Error comparing password', error);
  }
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  delete user.socketId;
  return user;
};

export const UserModel = model<IUserDocument, PaginateModel<IUserDocument>>(
  'User',
  userSchema
);
export { IUserDocument };
