import { Router } from 'express';

const errorRouter: Router = Router();

errorRouter.post('*', (_req, res) => {
  res.status(404).send('Page inexistante!');
});

export { errorRouter };
