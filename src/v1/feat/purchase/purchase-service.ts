import { BadRequest, ResourceNotFound } from '@middlewares/error-middleware';
import { PurchaseModel } from './purchase-model';
import { IPurchaseDocument } from './purchase-type';
import { Types } from 'mongoose';

export default class PurchaseService {
  public static async createPurchase(payload: IPurchaseDocument) {
    const purchase = await PurchaseModel.create(payload);
    return purchase;
  }

  public static async getPurchaseById(id: Types.ObjectId) {
    const purchase = await PurchaseModel.findById(id);
    if (!purchase) throw new ResourceNotFound('Purchase not found');

    return purchase;
  }
}
