import { Router } from 'express';
import { addprojects, deleteProjects, getProjects, patchProjects } from '../controllers/projets.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';

const projectRouter: Router = Router();

projectRouter.post('/user/:id/new_projects', authotized, addprojects);
projectRouter.get('/user/:id/projects', authotized, getProjects);
projectRouter.patch('/patch_projects/:id', authotized, patchProjects);
projectRouter.delete('/delete_projects/:id', authotized, deleteProjects);

export { projectRouter };
