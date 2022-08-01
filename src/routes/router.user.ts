import { Router } from 'express';
import { newUser, getDataUser, login, updateUser, deleteUserForProject, deleteUserForTask, allUsers } from '../controllers/user.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';

const userRouter: Router = Router();

userRouter.post('/newUser', newUser);
userRouter.post('/login', login);
userRouter.get('/userHome', authorized, getDataUser);
<<<<<<< HEAD

=======
userRouter.get('/allUsers', authorized, allUsers);
>>>>>>> feature/renaud
userRouter.patch('/home/updateUser', authorized, updateUser);
// userRouter.delete('/home/delete_profile', authorized, deleteUser);
userRouter.delete('/deleteUserForProject/:id', authorized, deleteUserForProject);
userRouter.delete('/deleteUserForTask/:id', authorized, deleteUserForTask);
export { userRouter };
