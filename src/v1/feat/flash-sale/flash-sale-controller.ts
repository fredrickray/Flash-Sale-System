import { Request, Response, NextFunction } from 'express';
import FlashSaleService from './flash-sale-service';
import { Types } from 'mongoose';

export default class FlashSaleController {
  public static async createFlashSale(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = req.body;
      const flashSale = await FlashSaleService.createFlashSale(payload);
      res.status(201).json({
        success: true,
        message: 'Flash sale created successfully',
        data: flashSale,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getFlashSaleById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const flashSaleId = new Types.ObjectId(req.params.id);
      const flashSale = await FlashSaleService.getFlashSaleById(flashSaleId);
      res.status(200).json({
        success: true,
        message: 'Flash sale retrieved successfully',
        data: flashSale,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFlashSales(req: Request, res: Response, next: NextFunction) {
    try {
      const flashSales = await FlashSaleService.getFlashSales();
      res.status(200).json({
        success: true,
        message: 'Flash sales retrieved successfully',
        data: flashSales,
      });
    } catch (error) {
      next(error);
    }
  }
}
