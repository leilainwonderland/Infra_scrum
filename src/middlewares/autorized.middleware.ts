import type { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import { err, ifError } from './error.middleware.js';
const { verify } = pkg;

const authotized = async (req: Request, res: Response, next: NextFunction) => {
  console.log('authotized');
  try {
    const jwtToken = req.headers.authorization?.split(' ')[1] || 'NO TOKEN';
    await verify(jwtToken, process.env.JWT_SECRET || 'nojwt');
    next();
  } catch {
    ifError('Bad token !!', 401);
    next(err);
  }
};

export { authotized };
