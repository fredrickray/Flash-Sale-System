import { Types } from 'mongoose';

export interface IFlashSale {
  product: string;
  totalUnit: Number;
  remainingUnit: Number;
  startTime: Date;
  endTime: Date;
  isActive: false;
}

export interface IFlashSaleDocument extends IFlashSale {}
