import { Router } from 'express';
import { addprojects, deleteProjects, getProjects, patchProjects } from '../controllers/projets.controller.js';
import { authorized } from '../middlewares/authorized.middleware.js';

const projectRouter: Router = Router();

projectRouter.post('/new_projects', authorized, addprojects);
projectRouter.get('/', authorized, getProjects);
projectRouter.patch('/patch_projects', authorized, patchProjects);
projectRouter.delete('/:id/delete_projects', authorized, deleteProjects);

export { projectRouter };
