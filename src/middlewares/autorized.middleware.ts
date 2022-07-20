import type { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import type { HttpError } from './error.middleware.js';
const { verify } = pkg;

const authotized = async (req: Request, res: Response, next: NextFunction) => {
  console.log('authotized');
  try {
    // PLS DON'T DELETE
    // const jwtToken = req.headers.authorization?.split(' ')[1] || 'NO TOKEN';
    // GOOD TOKEN TEST
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE2NTgyNTIyODR9.7PglVtv4y5FOLhKwxLPKqZtb4g2KnFQhky7SThVIJyI';
    // BAD TOKEN TEST
    // const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE2N4g2KnFQhky7SThVIJyI';
    // SAME
    await verify(jwtToken, process.env.JWT_SECRET || 'nojwt');
    next();
  } catch {
    const err = new Error('Bad token !!') as HttpError;
    err.status = 401;
    next(err);
  }
};

export { authotized };
