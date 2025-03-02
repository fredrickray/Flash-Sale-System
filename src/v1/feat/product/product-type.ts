export interface IProduct {
  name: string;
  totalUnit: number;
  startTime: Date;
  endTime: Date;
  isActive: false;
}

export interface IProductDocument extends IProduct {}
