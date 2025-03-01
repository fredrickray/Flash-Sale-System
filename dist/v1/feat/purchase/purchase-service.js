"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../../../middlewares/error-middleware");
const purchase_model_1 = require("./purchase-model");
class PurchaseService {
    static async createPurchase(payload) {
        const purchase = await purchase_model_1.PurchaseModel.create(payload);
        return purchase;
    }
    static async getPurchaseById(id) {
        const purchase = await purchase_model_1.PurchaseModel.findById(id);
        if (!purchase)
            throw new error_middleware_1.ResourceNotFound('Purchase not found');
        return purchase;
    }
}
exports.default = PurchaseService;
