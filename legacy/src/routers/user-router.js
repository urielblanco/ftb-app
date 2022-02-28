import express from 'express';

const userRouter = express.Router();

/* userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logout);
 */
//userRouter.use(authController.protect);

userRouter.get('/me', (req, res) => {
    res.send('Hello World!');
});

/* userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser); */

export { userRouter };
