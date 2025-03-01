"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../../../middlewares/error-middleware");
const flash_sale_model_1 = require("./flash-sale-model");
class FlashSaleService {
    static async createFlashSale(payload) {
        const flashSale = await flash_sale_model_1.FlashSaleModel.create(payload);
        return flashSale;
    }
    static async getFlashSaleById(id) {
        const flashSale = await flash_sale_model_1.FlashSaleModel.findById(id);
        if (!flashSale) {
            throw new error_middleware_1.ResourceNotFound('Flash sale not found');
        }
        return flashSale;
    }
}
exports.default = FlashSaleService;
