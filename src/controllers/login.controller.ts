import type { NextFunction, Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import { userRepository } from '../application.database.js';
import type { HttpError } from '../middlewares/error.middleware.js';
const { sign } = pkg;

const login = async (req: Request, res: Response, next:NextFunction) => {
  const user = await userRepository!.findOne({
    where: {
      email: req.body.email,
    },
    select: ['id', 'password'],
  });

  if (user && await user!.verifyPassword(req.body.password)) {
    const jwtToken = sign(
      {
        data: user.id,
      },
      process.env.JWT_SECRET || 'lesfullstacksontlesbest',
    );
    return res.json({ jwtToken });
  };
  const err = new Error() as HttpError;
  err.message = 'Bad credentials';
  err.status = 401;
  next(err);
};

export { login };
