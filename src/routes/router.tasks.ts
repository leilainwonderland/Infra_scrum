import { Router } from 'express';
import { addTasks, deleteTasks, getTaskByProject, patchTask } from '../controllers/tasks.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/new_tasks', authorized, addTasks);
taskRouter.delete('/delete_tasks', authorized, deleteTasks);
taskRouter.patch('/:id/patch_tasks', authorized, patchTask);
taskRouter.get('/get_tasks', authorized, getTaskByProject);
export { taskRouter };
