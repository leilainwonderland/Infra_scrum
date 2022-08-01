import { Router } from 'express';
import { newUser, getDataUser, login, updateUser, deleteUserForProject, allUsers } from '../controllers/user.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';

const userRouter: Router = Router();

userRouter.post('/newUser', newUser);
userRouter.post('/login', login);
userRouter.get('/userHome', authorized, getDataUser);
userRouter.get('/allUsers', authorized, allUsers);
userRouter.patch('/home/updateUser', authorized, updateUser);
// userRouter.delete('/home/delete_profile', authorized, deleteUser);
userRouter.patch('/deleteUserForProject/:id', authorized, deleteUserForProject);
// userRouter.delete('/deleteUserForTask/:id', authorized, deleteUserForTask);
export { userRouter };
