"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_route_1 = __importDefault(require("../feat/purchase/purchase-route"));
const product_route_1 = __importDefault(require("../feat/product/product-route"));
const auth_route_1 = __importDefault(require("../feat/auth/auth-route"));
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const indexRouter = (0, express_1.Router)();
// indexRouter.use('/auth', authRouter);
// indexRouter.use(AuthMiddleware.authorizeUser);
// indexRouter.use('/purchase', purchaseRouter);
// indexRouter.use('/flash-sale', productRouter);
// export default indexRouter;
exports.default = (io) => {
    indexRouter.use('/auth', auth_route_1.default);
    indexRouter.use(auth_middleware_1.AuthMiddleware.authorizeUser);
    indexRouter.use('/purchase', (0, purchase_route_1.default)(io)); // Pass io instance
    indexRouter.use('/flash-sale', product_route_1.default);
    return indexRouter;
};
