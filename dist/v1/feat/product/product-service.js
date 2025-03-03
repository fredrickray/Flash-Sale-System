"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../../../middlewares/error-middleware");
const product_model_1 = require("./product-model");
class ProductService {
    static async createproduct(payload) {
        const product = await product_model_1.ProductModel.create(payload);
        return product;
    }
    static async getProduct(id) {
        const product = await product_model_1.ProductModel.findById(id);
        if (!product) {
            throw new error_middleware_1.ResourceNotFound('Product not found');
        }
        return product;
    }
    static async getProducts() {
        const products = await product_model_1.ProductModel.find();
        return products;
    }
}
exports.default = ProductService;
