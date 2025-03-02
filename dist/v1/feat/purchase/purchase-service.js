"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../../../middlewares/error-middleware");
const purchase_model_1 = require("./purchase-model");
const mongoose_1 = __importDefault(require("mongoose"));
const flash_sale_model_1 = require("../flash-sale/flash-sale-model");
class PurchaseService {
    static async createPurchase(product, payload, user) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        console.log('Raeched here');
        console.log('user', user);
        try {
            const productExist = await flash_sale_model_1.FlashSaleModel.findById(product);
            if (!productExist)
                throw new error_middleware_1.ResourceNotFound('Product not found');
            if (!productExist.isActive)
                throw new error_middleware_1.BadRequest('Product is not active');
            if (productExist.totalUnit < payload.quantity)
                throw new error_middleware_1.BadRequest('Product unit left is less than quantity');
            productExist.totalUnit -= payload.quantity;
            await productExist.save({ session });
            const purchase = await purchase_model_1.PurchaseModel.create([{ ...payload, userId: user._id, productId: product }], { session });
            await session.commitTransaction();
            console.log('After commit transaction');
            session.endSession();
            console.log('Aftter end session');
            return purchase;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log('session aborted');
            throw error;
        }
    }
    static async getPurchaseById(id) {
        const purchase = await purchase_model_1.PurchaseModel.findById(id);
        if (!purchase)
            throw new error_middleware_1.ResourceNotFound('Purchase not found');
        return purchase;
    }
}
exports.default = PurchaseService;
