import { Router } from 'express';
import purchaseRouter from '@purchase/purchase-route';
import flashSaleRouter from '@flash-sale/flash-sale-route';
import authRouter from '@auth/auth-route';
const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/purchase', purchaseRouter);
indexRouter.use('/flash-sale', flashSaleRouter);

export default indexRouter;
