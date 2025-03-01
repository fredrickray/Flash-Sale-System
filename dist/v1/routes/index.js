"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_route_1 = __importDefault(require("../feat/purchase/purchase-route"));
const flash_sale_route_1 = __importDefault(require("../feat/flash-sale/flash-sale-route"));
const auth_route_1 = __importDefault(require("../feat/auth/auth-route"));
const indexRouter = (0, express_1.Router)();
indexRouter.use('/auth', auth_route_1.default);
indexRouter.use('/purchase', purchase_route_1.default);
indexRouter.use('/flash-sale', flash_sale_route_1.default);
exports.default = indexRouter;
