import { Router } from 'express';
import { addprojects } from '../controllers/addprojets.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';

const projectRouter: Router = Router();

projectRouter.post('/user/:id/new_projects', authotized, addprojects);

export { projectRouter };
