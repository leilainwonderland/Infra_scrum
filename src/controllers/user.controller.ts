import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { userRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';
import pkg from 'jsonwebtoken';
const { sign, decode } = pkg;

const addUser = async (req:Request, res:Response, next: NextFunction) => {
  const user = await userRepository.findOneBy({
    email: req.body.email,
  });
  if (user) {
    ifError('invalid request', 406);
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

const login = async (req: Request, res: Response, next:NextFunction) => {
  const user = await userRepository!.findOne({
    where: {
      email: req.body.email,
    },
    select: ['id', 'password'],
  });

  if (user && await user!.verifyPassword(req.body.password)) {
    const jwtToken = sign(
      { data: user.id },
      process.env.JWT_SECRET || 'lesfullstacksontlesbest',
    );
    return res.json({ jwtToken });
  };
  ifError('Bad credentials', 401);
  next(err);
};

const getDataUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: ['projects'],
  });
  res.status(200).json({ user });
};

export { addUser, login, getDataUser };
