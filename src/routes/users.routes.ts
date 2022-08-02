import { Router } from 'express';
import { newUser, getDataUser, login, updateUser, deleteUserForProject, deleteUserForTask, allUsers } from '../controllers/user.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';
import { validate } from '../validators/base.validators.js';
import { isValidLog } from '../validators/log.validators.js';
import { isValideUser } from '../validators/newUser.validators.js';

const userRouter: Router = Router();

userRouter.post('/newUser', isValideUser, validate, newUser);
userRouter.post('/login', isValidLog, validate, login);
userRouter.get('/userHome', authorized, getDataUser);
userRouter.get('/allUsers', authorized, allUsers);
userRouter.patch('/home/updateUser', authorized, updateUser);
// userRouter.delete('/home/delete_profile', authorized, deleteUser);
userRouter.delete('/deleteUserForProject/:id', authorized, deleteUserForProject);
userRouter.delete('/deleteUserForTask/:id', authorized, deleteUserForTask);
export { userRouter };
