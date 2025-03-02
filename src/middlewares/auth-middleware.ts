import { Request, Response, NextFunction } from 'express';
import { ResourceNotFound, Unauthorized } from './error-middleware';
import AuthService from '@auth/auth-service';
import { TokenType } from '@auth/auth-type';
import { IUserDocument, UserModel } from '@user/user-model';

declare global {
  namespace Express {
    interface Request {
      authUser?: IUserDocument;
    }
  }
}

export class AuthMiddleware {
  static async authorizeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers['at'] as string;
      if (!accessToken) throw new Unauthorized('Authorization token required');

      const decoded = await AuthService.verifyJWT(
        accessToken,
        TokenType.ACCESS
      );

      const userId = decoded.sub as string;

      const existingUser = await UserModel.findById(userId);
      if (!existingUser) throw new ResourceNotFound('User not found');

      if (existingUser.reAuth) {
        throw new Unauthorized('Access denied, please re-authenticate');
      }

      req.authUser = existingUser;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
