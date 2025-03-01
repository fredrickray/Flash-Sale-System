import { Router } from 'express';
import AuthController from './auth-controller';

const authRouter = Router();

authRouter.route('/signup').post(AuthController.signup.bind(AuthController));

authRouter.route('/signin').post(AuthController.signin.bind(AuthController));

export default authRouter;
