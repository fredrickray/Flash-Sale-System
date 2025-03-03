"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    totalUnit: { type: Number, required: true, default: 200 },
    startTime: { type: Date },
    isActive: { type: Boolean },
}, { timestamps: true });
productSchema.plugin(mongoose_paginate_v2_1.default);
productSchema.index({ name: 1 });
productSchema.index({ isActive: 1 });
exports.ProductModel = (0, mongoose_1.model)('product', productSchema);
