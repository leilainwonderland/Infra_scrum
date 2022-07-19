import { Router } from 'express';
import { login } from '../controllers/login.controller.js';
import { addUser, getDataUser } from '../controllers/user.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';

const router: Router = Router();

router.post('/users', addUser);
router.post('/login', login);
router.get('/home:id', authotized, getDataUser);

export { router };
