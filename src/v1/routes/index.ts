import { Router } from 'express';
import purchaseRouter from '@purchase/purchase-route';
import flashSaleRouter from '@flash-sale/flash-sale-route';

const indexRouter = Router();

indexRouter.use('/purchase', purchaseRouter);
indexRouter.use('/flash-sale', flashSaleRouter);

export default indexRouter;
