import { Router } from 'express';
import { addTasks, deleteTasks, getTaskByProject, getTaskByUser, patchTask } from '../controllers/tasks.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/new_task/:id', authorized, addTasks);
taskRouter.delete('/delete_task/:id', authorized, deleteTasks);
taskRouter.patch('/patch_task/:id', authorized, patchTask);
taskRouter.get('/get_tasksByProject/:id', authorized, getTaskByProject);
taskRouter.get('/get_tasksByUser', authorized, getTaskByUser);
export { taskRouter };
