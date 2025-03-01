"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth-controller"));
const authRouter = (0, express_1.Router)();
authRouter.route('/signup').post(auth_controller_1.default.signup.bind(auth_controller_1.default));
authRouter.route('/signin').post(auth_controller_1.default.signin.bind(auth_controller_1.default));
exports.default = authRouter;
