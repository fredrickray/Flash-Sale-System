import { Types } from 'mongoose';

export interface IPurchase {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: number;
  price: number;
  status: string;
}

export interface IPurchaseDocument extends IPurchase {}
