import { Router } from 'express';
import FlashSaleController from './flash-sale-controller';

const flashSaleRouter = Router();

flashSaleRouter
  .route('/')
  .post(FlashSaleController.createFlashSale.bind(FlashSaleController))
  .get(FlashSaleController.getFlashSaleById.bind(FlashSaleController));

export default flashSaleRouter;
