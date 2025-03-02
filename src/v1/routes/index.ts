import { Router } from 'express';
import purchaseRouter from '@purchase/purchase-route';
import flashSaleRouter from '@flash-sale/flash-sale-route';
import authRouter from '@auth/auth-route';
import { AuthMiddleware } from '@middlewares/auth-middleware';
const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use(AuthMiddleware.authorizeUser);

indexRouter.use('/purchase', purchaseRouter);
indexRouter.use('/flash-sale', flashSaleRouter);

export default indexRouter;
