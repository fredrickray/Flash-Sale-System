"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = __importDefault(require("./purchase-controller"));
const purchaseRouter = (0, express_1.default)();
purchaseRouter
    .route('/')
    .post(purchase_controller_1.default.createPurchase.bind(purchase_controller_1.default))
    .get(purchase_controller_1.default.getPurchaseById.bind(purchase_controller_1.default));
exports.default = purchaseRouter;
