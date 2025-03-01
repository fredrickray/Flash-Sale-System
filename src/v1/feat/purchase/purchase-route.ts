import Router from 'express';
import PurchaseController from './purchase-controller';

const purchaseRouter = Router();

purchaseRouter
  .route('/')
  .post(PurchaseController.createPurchase.bind(PurchaseController))
  .get(PurchaseController.getPurchaseById.bind(PurchaseController));

export default purchaseRouter;
