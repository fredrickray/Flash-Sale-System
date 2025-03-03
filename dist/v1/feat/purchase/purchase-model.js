"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const purchaseSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    // price: { type: Number, required: true },
    // status: { type: String, required: true },
}, {
    timestamps: true,
    optimisticConcurrency: true,
});
purchaseSchema.plugin(mongoose_paginate_v2_1.default);
exports.PurchaseModel = (0, mongoose_1.model)('purchase', purchaseSchema);
