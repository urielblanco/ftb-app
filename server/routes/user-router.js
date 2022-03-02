import express from 'express';
import * as userController from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.post('/login', userController.logInUser);
userRouter.post('/signup', userController.signUpUser);

export { userRouter };
