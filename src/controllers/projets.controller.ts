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
  req.body.userCreator = user;
  req.body.users = [user];
  try {
    const project = projectRepository.create(req.body);
    await projectRepository.save(project);
    return res.status(201).json({ status: 'OK' });
  } catch (e) {
    console.log(e);
  }
};

const deleteProjects = async (req: Request, res:Response, next:NextFunction) => {
  console.log('deleteProjects');
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const project = await projectRepository
    .createQueryBuilder('project')
    .where('project.id = :id', { id: req.body.id })
    .leftJoinAndSelect('project.userCreator', 'userCreator')
    .getOne();
  if (project?.userCreator.id === userId) {
    await projectRepository.delete(project!.id);
    return res.status(200).json({ status: 'OK' });
  }
  ifError('Forbidden', 403);
  return next(err);
};

const getProjects = async (req: Request, res:Response) => {
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
    .leftJoinAndSelect('user.projects', 'projects')
    .getOne();
  return res.status(200).json({ user });
};

const patchProjects = async (req: Request, res:Response, next:NextFunction) => {
  // ajouter des user
  console.log('patchProjects');
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const itIsHisProject = await projectRepository
    .createQueryBuilder('project')
    .where('project.id = :id', { id: req.body.id })
    .leftJoinAndSelect('project.userCreator', 'userCreator')
    .getOne();
  if (itIsHisProject?.userCreator.id === userId) {
    const project = await projectRepository
      .createQueryBuilder()
      .update('project')
      .set(req.body)
      .where('project.id = :id', { id: req.body.id });
    if (Object.keys(req.body).length >= 2) {
      // can still send empty req :( !!
      await project.execute();
      return res.status(200).json({ status: 'OK' });
    } else {
      ifError('Bad Request', 400);
      return next(err);
    }
  }
  ifError('Forbidden', 403);
  return next(err);
};

export { addprojects, deleteProjects, getProjects, patchProjects };
