import { Router } from 'express';
import ProductController from './product-controller';

const productRouter = Router();

productRouter
  .route('/')
  .post(ProductController.createProduct.bind(ProductController))
  .get(ProductController.getProducts.bind(ProductController));

productRouter
  .route('/:productId')
  .get(ProductController.getProduct.bind(ProductController));
export default productRouter;
