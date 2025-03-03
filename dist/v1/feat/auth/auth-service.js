"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../user/user-model");
const auth_type_1 = require("./auth-type");
const error_middleware_1 = require("../../../middlewares/error-middleware");
const dotenv_config_1 = __importDefault(require("../../../config/dotenv-config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_validation_1 = require("../../../validations/auth-validation");
class AuthService {
    static JWT_OPTIONS = {
        issuer: dotenv_config_1.default.JWTHeader.issuer,
        audience: dotenv_config_1.default.JWTHeader.audience,
        algorithm: dotenv_config_1.default.JWTHeader.algorithm,
    };
    static async signup(payload) {
        const { error } = auth_validation_1.signupValidationSchema.validate(payload);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new error_middleware_1.InvalidInput(errorMessages.join(', '));
        }
        const existingUser = await user_model_1.UserModel.findOne({ email: payload.email });
        if (existingUser)
            throw new error_middleware_1.Conflict('Email already exists');
        const user = await user_model_1.UserModel.create(payload);
        return user;
    }
    static async signin(payload) {
        const { error } = auth_validation_1.signinValidationSchema.validate(payload);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new error_middleware_1.InvalidInput(errorMessages.join(', '));
        }
        const user = await user_model_1.UserModel.findOne({ email: payload.email });
        if (!user)
            throw new error_middleware_1.Unauthorized('Invalid credentials');
        const isMatch = await user.comparePassword(payload.password);
        if (!isMatch)
            throw new error_middleware_1.BadRequest('Invalid credentials');
        const { accessToken, refreshToken } = await this.generateTokens(user);
        return { accessToken, refreshToken, user };
    }
    static async generateTokens(user) {
        const accessTokenPayload = {
            sub: user.id,
            iat: Date.now(),
            exp: Date.now() + dotenv_config_1.default.TokenExpiry.accessToken,
        };
        const refreshTokenPayload = {
            sub: user.id,
            // companyRole: user.companyRole.toString(),
            iat: Date.now(),
            exp: Date.now() + dotenv_config_1.default.TokenExpiry.refreshToken,
        };
        const accessToken = this.generateJWT(accessTokenPayload, dotenv_config_1.default.JWTHeader.accessTokenSecret);
        const refreshToken = this.generateJWT(refreshTokenPayload, dotenv_config_1.default.JWTHeader.refreshTokenSecret);
        return { accessToken, refreshToken };
    }
    static async generateAccessToken(userId) {
        const payload = {
            sub: userId,
            iat: Date.now(),
            exp: Date.now() + dotenv_config_1.default.TokenExpiry.accessToken,
        };
        return this.generateJWT(payload, dotenv_config_1.default.JWTHeader.accessTokenSecret);
    }
    static async generateRefreshToken(userId, rememberMe) {
        const exp = rememberMe
            ? dotenv_config_1.default.TokenExpiry.rememberMe
            : dotenv_config_1.default.TokenExpiry.refreshToken;
        const payload = {
            sub: userId,
            iat: Date.now(),
            exp: Date.now() + exp,
        };
        return this.generateJWT(payload, dotenv_config_1.default.JWTHeader.refreshTokenSecret);
    }
    static generateJWT(payload, secret) {
        return jsonwebtoken_1.default.sign(payload, secret, this.JWT_OPTIONS);
    }
    static async verifyJWT(token, type) {
        const secret = type === auth_type_1.TokenType.REFRESH
            ? dotenv_config_1.default.JWTHeader.refreshTokenSecret
            : dotenv_config_1.default.JWTHeader.accessTokenSecret;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret, this.JWT_OPTIONS);
            return decoded;
        }
        catch (error) {
            this.handleTokenError(error);
            throw new error_middleware_1.Unauthorized('Invalid or expired token');
        }
    }
    static handleTokenError(error) {
        if (error.name === 'TokenExpiredError') {
            throw new error_middleware_1.Unauthorized('Token has expired');
        }
        else if (error.name === 'JsonWebTokenError') {
            throw new error_middleware_1.Unauthorized('Invalid token');
        }
        else {
            throw new error_middleware_1.Unauthorized('Authentication failed');
        }
    }
    static async refreshToken(token) {
        const decoded = await this.verifyJWT(token, auth_type_1.TokenType.REFRESH);
        const accessToken = await this.generateAccessToken(decoded.sub);
        const refreshToken = await this.generateRefreshToken(decoded.sub, decoded.rememberMe);
        return { accessToken, refreshToken };
    }
}
exports.default = AuthService;
