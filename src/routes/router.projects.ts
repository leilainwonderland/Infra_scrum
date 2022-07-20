import { Router } from 'express';
import { addprojects } from '../controllers/addprojets.controller.js';

const projectRouter: Router = Router();

projectRouter.post('/new_projects', addprojects);

export { projectRouter };
