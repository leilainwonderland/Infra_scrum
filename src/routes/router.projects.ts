import { Router } from 'express';
import { addproject, deleteProject, getProject, patchProject } from '../controllers/projets.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';

const projectRouter: Router = Router();

projectRouter.post('/new_project', authorized, addproject);
projectRouter.get('/', authorized, getProject);
projectRouter.patch('/patch_project/:id', authorized, patchProject);
projectRouter.delete('/delete_project/:id', authorized, deleteProject);

export { projectRouter };
