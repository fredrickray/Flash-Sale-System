import Router from 'express';
import PurchaseController from './purchase-controller';
import { Server } from 'socket.io';
const purchaseRouter = Router();

// purchaseRouter
//   .route('/:productId')
//   .post(PurchaseController.createPurchase.bind(PurchaseController))
//   .get(PurchaseController.getPurchaseById.bind(PurchaseController));

// export default purchaseRouter;
export default (io: Server) => {
  // Middleware to attach io instance to request object
  purchaseRouter.use((req, res, next) => {
    req.app.set('io', io);
    next();
  });

  purchaseRouter
    .route('/leaderboard')
    .get(PurchaseController.getLeaderboard.bind(PurchaseController));

  purchaseRouter
    .route('/:productId')
    .post(PurchaseController.createPurchase.bind(PurchaseController))
    .get(PurchaseController.getPurchaseById.bind(PurchaseController));

  return purchaseRouter;
};
