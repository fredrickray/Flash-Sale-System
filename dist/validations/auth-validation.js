"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidationSchema = exports.signupValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).required(),
    lastName: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(5).required(),
});
exports.signinValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
