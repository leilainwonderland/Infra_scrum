import { Router } from 'express';
import { addUser, getDataUser, login } from '../controllers/user.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';

const userRouter: Router = Router();

userRouter.post('/new_user', addUser);
userRouter.post('/login', login);
// userRouter.get('/home/:id', authorized, getDataUser);
userRouter.get('/home', authorized, getDataUser);
// userRouter.patch('/home/uptade_profile', authorized, patchDataUser);
// userRouter.delete('/home/delete_profile', authorized, deleteDataUser);
export { userRouter };
