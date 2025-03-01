"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flash_sale_controller_1 = __importDefault(require("./flash-sale-controller"));
const flashSaleRouter = (0, express_1.Router)();
flashSaleRouter
    .route('/')
    .post(flash_sale_controller_1.default.createFlashSale.bind(flash_sale_controller_1.default))
    .get(flash_sale_controller_1.default.getFlashSaleById.bind(flash_sale_controller_1.default));
exports.default = flashSaleRouter;
