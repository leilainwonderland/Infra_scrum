import { Router } from 'express';
import { getDataUser, login } from '../controllers/login.controller.js';
import { addUser } from '../controllers/user.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';

const userRouter: Router = Router();

userRouter.post('/new_user', addUser);
userRouter.post('/login', login);
userRouter.get('/home', authotized, getDataUser);


export { userRouter };
