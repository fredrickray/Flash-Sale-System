import { Types } from 'mongoose';

export interface IFlashSale {
  product: string;
  totalUnit: number;
  startTime: Date;
  endTime: Date;
  isActive: false;
}

export interface IFlashSaleDocument extends IFlashSale {}
