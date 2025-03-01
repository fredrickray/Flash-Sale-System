import { Response, Request, NextFunction } from 'express';
import { BadRequest, ResourceNotFound } from '@middlewares/error-middleware';
import AuthService from './auth-service';
export default class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      const newUser = await AuthService.signup(payload);

      res.status(201).json({
        success: true,
        message: 'User created successfully, PROCEED TO LOGIN',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      let { email, password } = req.body;
      const { accessToken, refreshToken, user } = await AuthService.signin({
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
    } catch (error) {
      next(error);
    }
  }
}
