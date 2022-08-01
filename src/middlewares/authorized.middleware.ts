import type { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import { err, ifError } from '../helpers/error.helpers.js';
const { verify } = pkg;

const authorized = async (req: Request, res: Response, next: NextFunction) => {
  console.log('authorized');
  try {
    const jwtToken = req.headers.authorization?.split(' ')[1] || 'NO TOKEN';
    await verify(jwtToken, process.env.JWT_SECRET || 'nojwt');
    next();
  } catch {
    ifError('Bad token !!', 401);
    next(err);
  }
};

export { authorized };
