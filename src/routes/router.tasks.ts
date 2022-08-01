import { Router } from 'express';
import { addTask, deleteTask, getTaskByProject, getTaskByUser, patchTask, deleteUserForTask } from '../controllers/tasks.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/new_task/:id', authorized, addTask);
taskRouter.delete('/delete_task/:id', authorized, deleteTask);
taskRouter.patch('/patch_task/:id', authorized, patchTask);
taskRouter.get('/get_tasksByProject/:id', authorized, getTaskByProject);
taskRouter.get('/get_tasksByUser', authorized, getTaskByUser);
taskRouter.delete('/deleteUserForTask/:id', authorized, deleteUserForTask);
export { taskRouter };
