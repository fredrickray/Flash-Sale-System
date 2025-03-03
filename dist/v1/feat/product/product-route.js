"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product-controller"));
const productRouter = (0, express_1.Router)();
productRouter
    .route('/')
    .post(product_controller_1.default.createProduct.bind(product_controller_1.default))
    .get(product_controller_1.default.getProducts.bind(product_controller_1.default));
productRouter
    .route('/:productId')
    .get(product_controller_1.default.getProduct.bind(product_controller_1.default));
exports.default = productRouter;
