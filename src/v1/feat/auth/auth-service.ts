import { UserModel } from '@user/user-model';
import { IUserDocument } from '@user/user-type';
import { TokenModel } from './auth-model';
import { ISignIn, ISignUp, IToken, TokenPayload, TokenType } from './auth-type';
import {
  BadRequest,
  Conflict,
  ResourceNotFound,
  Unauthorized,
} from '@middlewares/error-middleware';
import Config from '@config/dotenv-config';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
export default class AuthService {
  private static JWT_OPTIONS: SignOptions = {
    issuer: Config.JWTHeader.issuer,
    audience: Config.JWTHeader.audience,
    algorithm: Config.JWTHeader.algorithm,
  };
  static async signup(payload: ISignUp) {
    const existingUser = await UserModel.findOne({ email: payload.email });
    if (existingUser) throw new Conflict('Email already exists');

    const user = await UserModel.create(payload);
    return user;
  }

  static async signin(payload: ISignIn) {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) throw new Unauthorized('Invalid credentials');

    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) throw new BadRequest('Invalid credentials');

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return { accessToken, refreshToken, user };
  }

  private static async generateTokens(user: IUserDocument) {
    const accessTokenPayload: TokenPayload = {
      sub: user.id,
      iat: Date.now(),
      exp: Date.now() + Config.TokenExpiry.accessToken,
    };

    const refreshTokenPayload: TokenPayload = {
      sub: user.id,
      // companyRole: user.companyRole.toString(),
      iat: Date.now(),
      exp: Date.now() + Config.TokenExpiry.refreshToken,
    };

    const accessToken = this.generateJWT(
      accessTokenPayload,
      Config.JWTHeader.accessTokenSecret
    );
    const refreshToken = this.generateJWT(
      refreshTokenPayload,
      Config.JWTHeader.refreshTokenSecret
    );

    return { accessToken, refreshToken };
  }

  private static async generateAccessToken(userId: string): Promise<string> {
    const payload: TokenPayload = {
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + Config.TokenExpiry.accessToken,
    };

    return this.generateJWT(payload, Config.JWTHeader.accessTokenSecret);
  }

  private static async generateRefreshToken(
    userId: string,
    rememberMe: boolean
  ): Promise<string> {
    const exp = rememberMe
      ? Config.TokenExpiry.rememberMe
      : Config.TokenExpiry.refreshToken;
    const payload: TokenPayload = {
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + exp,
    };

    return this.generateJWT(payload, Config.JWTHeader.refreshTokenSecret);
  }

  private static generateJWT(payload: TokenPayload, secret: string): string {
    return jwt.sign(payload, secret, this.JWT_OPTIONS);
  }

  static async verifyJWT(token: string, type: TokenType): Promise<JwtPayload> {
    const secret =
      type === TokenType.REFRESH
        ? Config.JWTHeader.refreshTokenSecret
        : Config.JWTHeader.accessTokenSecret;

    try {
      const decoded = jwt.verify(token, secret, this.JWT_OPTIONS) as JwtPayload;
      return decoded;
    } catch (error: any) {
      this.handleTokenError(error);
      throw new Unauthorized('Invalid or expired token');
    }
  }

  private static handleTokenError(error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new Unauthorized('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Unauthorized('Invalid token');
    } else {
      throw new Unauthorized('Authentication failed');
    }
  }

  static async refreshToken(token: string) {
    const decoded = await this.verifyJWT(token, TokenType.REFRESH);

    const accessToken = await this.generateAccessToken(decoded.sub!);

    const refreshToken = await this.generateRefreshToken(
      decoded.sub!,
      decoded.rememberMe
    );

    return { accessToken, refreshToken };
  }
}
