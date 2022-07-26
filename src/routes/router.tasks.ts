import { Router } from 'express';
import { addTasks } from '../controllers/tasks.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';
const taskRouter: Router = Router();

taskRouter.post('/:id/new_tasks', authotized, addTasks);

export { taskRouter };
