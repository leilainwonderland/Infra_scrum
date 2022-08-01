import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { userRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';
import pkg from 'jsonwebtoken';
const { sign, decode } = pkg;

const newUser = async (req:Request, res:Response, next: NextFunction) => {
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: req.body.email })
    .getOne();
  if (user) {
    ifError('invalid request', 406);
    return next(err);
  }
  try {
    const user = await userRepository.create(req.body);
    await userRepository.save(user);
    return res.status(201).json({ status: 'OK' });
  } catch (e) {
    console.log(e);
  }
};

const login = async (req: Request, res: Response, next:NextFunction) => {
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: req.body.email })
    .getOne();

  if (user && await user!.verifyPassword(req.body.password)) {
    const jwtToken = sign(
      { data: user.id },
      process.env.JWT_SECRET || 'lesfullstacksontlesbest',
    );
    return res.json({ jwtToken });
  };
  ifError('Bad credentials', 401);
  return next(err);
};

const getDataUser = async (req: Request, res: Response) => {
  console.log('Logged to back end: ok');
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id: userId })
    .select([
      'user.email',
      'user.city',
      'user.name',
      'user.lastName',
      'user.role',
      'user.tel',
      'user.img',
    ])
    .getOne();
  return res.status(200).json({ user });
};

const updateUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const user = await userRepository
    .createQueryBuilder()
    .update('user')
    .set(req.body)
    .where('user.id = :id', { id: userId });
  await user.execute();
  return res.status(200).json({ status: 'OK' });
};

// const allUsers = async (req: Request, res: Response) => {
//   const users = await userRepository.find();
//   return res.status(200).json({ users });
// };

const deleteUserForProject = async (req: Request, res: Response) => {
  console.log('deleteUserForProject');
};

const deleteUserForTask = async (req: Request, res: Response) => {
  console.log('deleteUserForTask');
};

<<<<<<< HEAD
=======
const allUsers = async (req: Request, res: Response) => {
  console.log('allUsers');
  const users = await userRepository
    .createQueryBuilder('users')
    .select([
      'users.email',
      'users.name',
      'users.lastName',
    ])
    .getMany();
  return res.status(200).json({ users });
}



>>>>>>> feature/renaud
export { newUser, login, getDataUser, updateUser, deleteUserForProject, deleteUserForTask, allUsers };
