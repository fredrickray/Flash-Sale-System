import {
  BadRequest,
  InvalidInput,
  ResourceNotFound,
} from '@middlewares/error-middleware';
import { ProductModel } from './product-model';
import { IProductDocument } from './product-type';
import { Types } from 'mongoose';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from '@validations/product-validation';
export default class ProductService {
  public static async createproduct(payload: IProductDocument) {
    const { error } = createProductValidationSchema.validate(payload);
    if (error) {
      const errorMessages: string[] = error.details.map(
        (detail) => detail.message
      );
      throw new InvalidInput(errorMessages.join(', '));
    }
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

  static async updateProduct(
    id: Types.ObjectId,
    payload: Partial<IProductDocument>
  ) {
    const { error } = updateProductValidationSchema.validate(payload);
    if (error) {
      const errorMessages: string[] = error.details.map(
        (detail) => detail.message
      );
      throw new InvalidInput(errorMessages.join(', '));
    }
    const product = await ProductModel.findById(id);
    if (!product) throw new ResourceNotFound('Product not found');

    Object.assign(product, payload);
    await product.save();
    return product;
  }
}
