import { Router } from 'express';
import { newUser, getDataUser, login, updateUser, deleteUserForProject, deleteUserForTask } from '../controllers/user.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';

const userRouter: Router = Router();

userRouter.post('/newUser', newUser);
userRouter.post('/login', login);
userRouter.get('/userHome', authorized, getDataUser);

userRouter.patch('/home/updateUser', authorized, updateUser);
// userRouter.delete('/home/delete_profile', authorized, deleteUser);
userRouter.delete('/deleteUserForProject/:id', authorized, deleteUserForProject);
userRouter.delete('/deleteUserForTask/:id', authorized, deleteUserForTask);
export { userRouter };
