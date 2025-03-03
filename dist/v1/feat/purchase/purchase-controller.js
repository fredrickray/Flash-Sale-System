"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_service_1 = __importDefault(require("./purchase-service"));
const mongoose_1 = require("mongoose");
class PurchaseController {
    static async createPurchase(req, res, next) {
        try {
            const io = req.app.get('io');
            const authUser = req.authUser;
            const product = new mongoose_1.Types.ObjectId(req.params.productId);
            const payload = req.body;
            const purchase = await purchase_service_1.default.createPurchase(product, payload, authUser, io);
            res.status(201).json({
                success: true,
                message: 'Purchase created successfully',
                data: purchase,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getPurchaseById(req, res, next) {
        try {
            const purchaseId = new mongoose_1.Types.ObjectId(req.params.id);
            const purchase = await purchase_service_1.default.getPurchaseById(purchaseId);
            res.status(200).json({
                success: true,
                message: 'Purchase retrieved successfully',
                data: purchase,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getLeaderboard(req, res, next) {
        try {
            const leaderboard = await purchase_service_1.default.leaderboard();
            res.status(200).json({
                success: true,
                message: 'Leaderboard retrieved successfully',
                data: leaderboard,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = PurchaseController;
