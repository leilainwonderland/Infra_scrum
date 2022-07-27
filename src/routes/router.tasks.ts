import { Router } from 'express';
import { addTasks, deleteTasks, patchTask } from '../controllers/tasks.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/new_tasks', authotized, addTasks);
taskRouter.delete('/:id/delete_tasks', authotized, deleteTasks);
taskRouter.patch('/:id/patch_tasks', authotized, patchTask);

export { taskRouter };
