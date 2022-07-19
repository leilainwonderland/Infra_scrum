import type { Request, Response } from 'express';
import { userRepository } from '../application.database.js';

const addUser = async (req:Request, res:Response) => {
  try {
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.json({ user });
  } catch (e) {
    res.status(406).json({ error: 'invalid request' });
  }
};

const getDataUser = async (req: Request, res: Response) => {
  console.log('getDataUser');
  console.log(req.query.id);

  // const userData = await userRepository.findOneBy({
  //   id: req.query.id,
  // });
  // res.json({ res: userData });
};

export { addUser, getDataUser };
