import { Router } from 'express';
import { addTasks, deleteTasks, getTaskByProject, getTaskByUser, patchTask } from '../controllers/tasks.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/new_tasks', authorized, addTasks);
taskRouter.delete('/delete_tasks', authorized, deleteTasks);
taskRouter.patch('/:id/patch_tasks', authorized, patchTask);
taskRouter.get('/get_tasksByProject', authorized, getTaskByProject);
taskRouter.get('/get_tasksByUser', authorized, getTaskByUser);
export { taskRouter };
