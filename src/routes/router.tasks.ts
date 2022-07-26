import { Router } from 'express';
import { addTasks, deleteTasks } from '../controllers/tasks.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/:id/new_tasks', authotized, addTasks);
taskRouter.delete('/:id/delete_tasks', authotized, deleteTasks);

export { taskRouter };
