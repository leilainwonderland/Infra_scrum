import { Router } from 'express';
import { login } from '../controllers/user.controller.js';

const router: Router = Router();

router.post('/users', login);

export { router };
