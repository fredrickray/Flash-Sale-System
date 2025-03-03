import { Request, Response, NextFunction } from 'express';
import PurchaseService from './purchase-service';
import { Types } from 'mongoose';
import { Server } from 'socket.io';

export default class PurchaseController {
  public static async createPurchase(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const io: Server = req.app.get('io');
      const authUser = req.authUser!;
      const product = new Types.ObjectId(req.params.productId);
      const payload = req.body;
      const purchase = await PurchaseService.createPurchase(
        product,
        payload,
        authUser,
        io
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

  public static async getLeaderboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const leaderboard = await PurchaseService.leaderboard();
      res.status(200).json({
        success: true,
        message: 'Leaderboard retrieved successfully',
        data: leaderboard,
      });
    } catch (error) {
      next(error);
    }
  }
}
