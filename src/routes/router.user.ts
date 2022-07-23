import { Router } from 'express';
import { addUser, getDataUser, login } from '../controllers/user.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';

const userRouter: Router = Router();

userRouter.post('/new_user', addUser);
userRouter.post('/login', login);
userRouter.get('/home/:id', authotized, getDataUser);
// userRouter.patch('/home/:id/uptade_profile', authotized, patchDataUser);
// userRouter.delete('/home/:id/delete_profile', authotized, deleteDataUser);
export { userRouter };
