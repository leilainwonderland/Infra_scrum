import { Router } from 'express';
import { getDataUser, login } from '../controllers/login.controller.js';
import { addUser } from '../controllers/user.controller.js';
import { authotized } from '../middlewares/autorized.middleware.js';

const router: Router = Router();

router.post('/users', addUser);
router.post('/login', login);
router.get('/home', authotized, getDataUser);

export { router };
