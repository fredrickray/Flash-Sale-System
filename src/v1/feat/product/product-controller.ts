import { Request, Response, NextFunction } from 'express';
import ProductService from './product-service';
import { Types } from 'mongoose';

export default class ProductController {
  public static async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = req.body;
      const product = await ProductService.createproduct(payload);
      res.status(201).json({
        success: true,
        message: 'Flash sale created successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productId = new Types.ObjectId(req.params.id);
      const product = await ProductService.getProduct(productId);
      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = new Types.ObjectId(req.params.id);
      const payload = req.body;
      const product = await ProductService.updateProduct(productId, payload);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}
