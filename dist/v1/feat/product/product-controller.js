"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("./product-service"));
const mongoose_1 = require("mongoose");
class ProductController {
    static async createProduct(req, res, next) {
        try {
            const payload = req.body;
            const product = await product_service_1.default.createproduct(payload);
            res.status(201).json({
                success: true,
                message: 'Flash sale created successfully',
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getProduct(req, res, next) {
        try {
            const productId = new mongoose_1.Types.ObjectId(req.params.id);
            const product = await product_service_1.default.getProduct(productId);
            res.status(200).json({
                success: true,
                message: 'Product retrieved successfully',
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getProducts(req, res, next) {
        try {
            const products = await product_service_1.default.getProducts();
            res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: products,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProduct(req, res, next) {
        try {
            const productId = new mongoose_1.Types.ObjectId(req.params.id);
            const payload = req.body;
            const product = await product_service_1.default.updateProduct(productId, payload);
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
