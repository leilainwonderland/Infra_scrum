import type { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import type { HttpError } from './error.middleware.js';
const { verify } = pkg;

const authotized = async (req: Request, res: Response, next: NextFunction) => {
  console.log('authotized');
  try {
    // PLS DON'T DELETE
    // const jwtToken = req.headers.authorization?.split(' ')[1] || 'NO TOKEN';
    const jwtToken = `${process.env.JWT_TOKEN}`;
    await verify(jwtToken, process.env.JWT_SECRET || 'nojwt');
    next();
  } catch {
    const err = new Error('Bad token !!') as HttpError;
    err.status = 401;
    next(err);
  }
};

export { authotized };
