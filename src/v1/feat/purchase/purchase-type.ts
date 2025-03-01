import { Types } from 'mongoose';

export interface IPurchase {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: Number;
  price: Number;
  status: string;
}

export interface IPurchaseDocument extends IPurchase {}
