import { BadRequest, ResourceNotFound } from '@middlewares/error-middleware';
import { FlashSaleModel } from './flash-sale-model';
import { IFlashSaleDocument } from './flash-sale-type';
import { Types } from 'mongoose';

export default class FlashSaleService {
  public static async createFlashSale(payload: IFlashSaleDocument) {
    const flashSale = await FlashSaleModel.create(payload);
    return flashSale;
  }

  public static async getFlashSaleById(id: Types.ObjectId) {
    const flashSale = await FlashSaleModel.findById(id);
    if (!flashSale) {
      throw new ResourceNotFound('Flash sale not found');
    }
    return flashSale;
  }

  static async getFlashSales(): Promise<IFlashSaleDocument[]> {
    const flashSales = await FlashSaleModel.find();
    return flashSales;
  }
}
