"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = __importDefault(require("./purchase-controller"));
const purchaseRouter = (0, express_1.default)();
// purchaseRouter
//   .route('/:productId')
//   .post(PurchaseController.createPurchase.bind(PurchaseController))
//   .get(PurchaseController.getPurchaseById.bind(PurchaseController));
// export default purchaseRouter;
exports.default = (io) => {
    // Middleware to attach io instance to request object
    purchaseRouter.use((req, res, next) => {
        req.app.set('io', io);
        next();
    });
    purchaseRouter
        .route('/:productId')
        .post(purchase_controller_1.default.createPurchase.bind(purchase_controller_1.default))
        .get(purchase_controller_1.default.getPurchaseById.bind(purchase_controller_1.default));
    return purchaseRouter;
};
