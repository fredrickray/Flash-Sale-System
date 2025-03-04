"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    totalUnit: joi_1.default.number(),
    startDate: joi_1.default.date(),
    startTime: joi_1.default.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/), // 24-hour format
    isActive: joi_1.default.boolean(),
});
exports.updateProductValidationSchema = joi_1.default.object({
    name: joi_1.default.string(),
    totalUnit: joi_1.default.number(),
    startDate: joi_1.default.date(),
    startTime: joi_1.default.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/), // 24-hour format
    isActive: joi_1.default.boolean(),
}).min(1); // At least one field must be provided
