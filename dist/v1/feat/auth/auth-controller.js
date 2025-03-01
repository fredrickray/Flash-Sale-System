"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth-service"));
class AuthController {
    static async signup(req, res, next) {
        try {
            const payload = req.body;
            const newUser = await auth_service_1.default.signup(payload);
            res.status(201).json({
                success: true,
                message: 'User created successfully, PROCEED TO LOGIN',
                data: newUser,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async signin(req, res, next) {
        try {
            let { email, password } = req.body;
            const { accessToken, refreshToken, user } = await auth_service_1.default.signin({
                email,
                password,
            });
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('at', accessToken);
            res.setHeader('rt', refreshToken);
            res.status(200).json({
                success: true,
                message: 'Signin successful',
                accessToken,
                refreshToken,
                user,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
