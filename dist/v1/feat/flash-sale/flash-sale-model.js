"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashSaleModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const flashSaleSchema = new mongoose_1.Schema({
    product: { type: String, required: true },
    totalUnit: { type: Number, required: true, default: 200 },
    remainingUnit: { type: Number },
    startTime: { type: Date },
    endTime: { type: Date },
    isActive: { type: Boolean },
}, { timestamps: true });
flashSaleSchema.plugin(mongoose_paginate_v2_1.default);
exports.FlashSaleModel = (0, mongoose_1.model)('flashSale', flashSaleSchema);
