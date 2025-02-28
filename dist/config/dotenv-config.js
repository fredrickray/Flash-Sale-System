"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Config = {
    serverPort: process.env.PORT,
    Database: {
        url: process.env.MONGO_URL,
        testUrl: process.env.TEST_MONGO_URL,
    },
    JWTHeader: {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        algorithm: process.env.JWT_ALGORITHM,
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    },
    TokenExpiry: {
        accessToken: parseInt(process.env.ACCESS_TOKEN_EXPIRY),
        refreshToken: parseInt(process.env.REFRESH_TOKEN_EXPIRY),
        rememberMe: parseInt(process.env.REMEMBER_ME_EXPIRY),
    },
    serverBaseURL: process.env.SERVER_BASE_URL,
    BcryptSalt: parseInt(process.env.BCRYPT_SALT),
};
exports.default = Config;
