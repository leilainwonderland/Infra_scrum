import type { NextFunction, Request, Response } from 'express';

const authotized = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers) {
    console.log(req.header);

    return next();
  }
};

export { authotized };
