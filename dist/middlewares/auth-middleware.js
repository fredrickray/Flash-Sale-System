"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const error_middleware_1 = require("./error-middleware");
const auth_service_1 = __importDefault(require("../v1/feat/auth/auth-service"));
const auth_type_1 = require("../v1/feat/auth/auth-type");
const user_model_1 = require("../v1/feat/user/user-model");
class AuthMiddleware {
    static async authorizeUser(req, res, next) {
        try {
            const accessToken = req.headers['at'];
            if (!accessToken)
                throw new error_middleware_1.Unauthorized('Authorization token required');
            const decoded = await auth_service_1.default.verifyJWT(accessToken, auth_type_1.TokenType.ACCESS);
            const userId = decoded.sub;
            const existingUser = await user_model_1.UserModel.findById(userId);
            if (!existingUser)
                throw new error_middleware_1.ResourceNotFound('User not found');
            if (existingUser.reAuth) {
                throw new error_middleware_1.Unauthorized('Access denied, please re-authenticate');
            }
            req.authUser = existingUser;
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
