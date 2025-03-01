"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flash_sale_service_1 = __importDefault(require("./flash-sale-service"));
const mongoose_1 = require("mongoose");
class FlashSaleController {
    static async createFlashSale(req, res, next) {
        try {
            const payload = req.body;
            const flashSale = await flash_sale_service_1.default.createFlashSale(payload);
            res.status(201).json({
                success: true,
                message: 'Flash sale created successfully',
                data: flashSale,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getFlashSaleById(req, res, next) {
        try {
            const flashSaleId = new mongoose_1.Types.ObjectId(req.params.id);
            const flashSale = await flash_sale_service_1.default.getFlashSaleById(flashSaleId);
            res.status(200).json({
                success: true,
                message: 'Flash sale retrieved successfully',
                data: flashSale,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = FlashSaleController;
