import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const Config = {
  serverPort: process.env.PORT as string,
  Database: {
    url: process.env.MONGO_URL as string,
    testUrl: process.env.TEST_MONGO_URL as string,
  },
  JWTHeader: {
    issuer: process.env.JWT_ISSUER as string,
    audience: process.env.JWT_AUDIENCE as string,
    algorithm: process.env.JWT_ALGORITHM as unknown as jwt.Algorithm,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  },
  TokenExpiry: {
    accessToken: parseInt(process.env.ACCESS_TOKEN_EXPIRY as string),
    refreshToken: parseInt(process.env.REFRESH_TOKEN_EXPIRY as string),
    rememberMe: parseInt(process.env.REMEMBER_ME_EXPIRY as string),
  },
  serverBaseURL: process.env.SERVER_BASE_URL as string,
  BcryptSalt: parseInt(process.env.BCRYPT_SALT as string),
};

export default Config;
