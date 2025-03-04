"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../../../middlewares/error-middleware");
const product_model_1 = require("./product-model");
const product_validation_1 = require("../../../validations/product-validation");
class ProductService {
    static async createproduct(payload) {
        const { error } = product_validation_1.createProductValidationSchema.validate(payload);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new error_middleware_1.InvalidInput(errorMessages.join(', '));
        }
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
    static async updateProduct(id, payload) {
        const { error } = product_validation_1.updateProductValidationSchema.validate(payload);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new error_middleware_1.InvalidInput(errorMessages.join(', '));
        }
        const product = await product_model_1.ProductModel.findById(id);
        if (!product)
            throw new error_middleware_1.ResourceNotFound('Product not found');
        Object.assign(product, payload);
        await product.save();
        return product;
    }
}
exports.default = ProductService;
