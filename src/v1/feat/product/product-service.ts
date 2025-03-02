import { BadRequest, ResourceNotFound } from '@middlewares/error-middleware';
import { ProductModel } from './product-model';
import { IProductDocument } from './product-type';
import { Types } from 'mongoose';

export default class ProductService {
  public static async createproduct(payload: IProductDocument) {
    const product = await ProductModel.create(payload);
    return product;
  }

  public static async getProduct(id: Types.ObjectId) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ResourceNotFound('Product not found');
    }
    return product;
  }

  static async getProducts(): Promise<IProductDocument[]> {
    const products = await ProductModel.find();
    return products;
  }
}
