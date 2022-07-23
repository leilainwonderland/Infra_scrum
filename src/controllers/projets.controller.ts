/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { projectRepository, userRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';

const addprojects = async (req:Request, res:Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const user = await userRepository.findOneBy({ id: userId });
  req.body.userCreator = user!.id;
  req.body.users = [user];
  try {
    const project = projectRepository.create(req.body);
    await projectRepository.save(project);
    res.status(201).json({ project });
  } catch (e) {
    console.log(e);
  }
};

const deleteProjects = async (req: Request, res:Response, next:NextFunction) => {
  console.log('deleteProjects');

  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  try {
    const project = await projectRepository.findOneBy({
      id: req.body.id,
    });
    if (userId === project?.userCreator) {
      await projectRepository.delete(project!.id);
      console.log('You can Delete');
      res.status(200).json('OK');
    };
  } catch (e) {
    console.log(e);
  };
  ifError('Forbidden', 403);
  return next(err);
};

export { addprojects, deleteProjects };
