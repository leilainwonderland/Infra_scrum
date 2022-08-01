import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { err, ifError } from '../helpers/error.helpers.js';

const errorRouter: Router = Router();

errorRouter.get('*', (req:Request, res:Response, next: NextFunction) => {
  ifError('Not Found', 404);
  return next(err);
});

export { errorRouter };
