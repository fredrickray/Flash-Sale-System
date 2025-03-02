import { Request, Response, NextFunction } from 'express';
import PurchaseService from './purchase-service';
import { Types } from 'mongoose';

export default class PurchaseController {
  public static async createPurchase(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authUser = req.authUser!;
      const product = new Types.ObjectId(req.params.productId);
      const payload = req.body;
      const purchase = await PurchaseService.createPurchase(
        product,
        payload,
        authUser
      );
      res.status(201).json({
        success: true,
        message: 'Purchase created successfully',
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getPurchaseById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const purchaseId = new Types.ObjectId(req.params.id);
      const purchase = await PurchaseService.getPurchaseById(purchaseId);
      res.status(200).json({
        success: true,
        message: 'Purchase retrieved successfully',
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }
}
