import { Router } from 'express';
import { login } from '../controllers/login.controller.js';
import { addUser } from '../controllers/user.controller.js';

const router: Router = Router();

router.post('/users', addUser);
router.post('/login', login);

export { router };
