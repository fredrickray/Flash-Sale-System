import { Schema, model } from 'mongoose';
import { IToken } from './auth-type';

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800, // 30 minutes in seconds
  },
});

export const TokenModel = model('Token', tokenSchema);
