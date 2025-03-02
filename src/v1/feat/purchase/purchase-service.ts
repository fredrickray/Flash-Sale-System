import { BadRequest, ResourceNotFound } from '@middlewares/error-middleware';
import { PurchaseModel } from './purchase-model';
import { IPurchaseDocument } from './purchase-type';
import mongoose, { Types } from 'mongoose';
import { IUserDocument } from '@user/user-type';
import { FlashSaleModel } from '@flash-sale/flash-sale-model';

export default class PurchaseService {
  public static async createPurchase(
    product: Types.ObjectId,
    payload: IPurchaseDocument,
    user: IUserDocument
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('Raeched here');
    console.log('user', user);
    try {
      const productExist = await FlashSaleModel.findById(product);
      if (!productExist) throw new ResourceNotFound('Product not found');

      if (!productExist.isActive) throw new BadRequest('Product is not active');

      if (productExist.totalUnit < payload.quantity)
        throw new BadRequest('Product unit left is less than quantity');

      productExist.totalUnit -= payload.quantity;
      await productExist.save({ session });
      const purchase = await PurchaseModel.create(
        [{ ...payload, userId: user._id, productId: product }],
        { session }
      );
      await session.commitTransaction();
      console.log('After commit transaction');
      session.endSession();
      console.log('Aftter end session');

      return purchase;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log('session aborted');
      throw error;
    }
  }

  public static async getPurchaseById(id: Types.ObjectId) {
    const purchase = await PurchaseModel.findById(id);
    if (!purchase) throw new ResourceNotFound('Purchase not found');

    return purchase;
  }
}
