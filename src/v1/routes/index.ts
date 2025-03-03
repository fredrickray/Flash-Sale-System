import { Router } from 'express';
import purchaseRouter from '@purchase/purchase-route';
import productRouter from '@product/product-route';
import authRouter from '@auth/auth-route';
import { AuthMiddleware } from '@middlewares/auth-middleware';
import { Server } from 'socket.io';

const indexRouter = Router();

// indexRouter.use('/auth', authRouter);

// indexRouter.use(AuthMiddleware.authorizeUser);

// indexRouter.use('/purchase', purchaseRouter);
// indexRouter.use('/flash-sale', productRouter);

// export default indexRouter;
export default (io: Server) => {
  indexRouter.use('/auth', authRouter);

  indexRouter.use(AuthMiddleware.authorizeUser);

  indexRouter.use('/purchase', purchaseRouter(io)); // Pass io instance
  indexRouter.use('/flash-sale', productRouter);

  return indexRouter;
};
