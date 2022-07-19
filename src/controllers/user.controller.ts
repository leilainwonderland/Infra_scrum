import type { Request, Response } from 'express';
import { userRepository } from '../application.database.js';

const login = async (req:Request, res:Response) => {
  const user = userRepository.create(req.body);
  await userRepository.save(user);
  res.json({ user });
};

export { login };
