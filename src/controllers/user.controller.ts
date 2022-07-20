import type { NextFunction, Request, Response } from 'express';
import { userRepository } from '../application.database.js';
import type { HttpError } from '../middlewares/error.middleware.js';

const addUser = async (req:Request, res:Response, next: NextFunction) => {
  const user = await userRepository.findOneBy({
    email: req.body.email,
  });
  if (user) {
    const err = new Error() as HttpError;
    err.message = 'invalid request';
    err.status = 406;
    return next(err);
  }
  try {
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
};

export { addUser };
