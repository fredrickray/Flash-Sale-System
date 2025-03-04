export interface IProduct {
  name: string;
  totalUnit: number;
  startDate: Date;
  startTime: string;
  // endTime: Date;
  isActive: false;
}

export interface IProductDocument extends IProduct {}
