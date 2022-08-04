import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { projectRepository, userRepository } from '../application.database.js';
import { err, ifError } from '../helpers/error.helpers.js';
import { Project } from '../models/projects.model.js';
import { User } from '../models/users.model.js';

const addproject = async (req:Request, res:Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id: userId })
    .getOne();
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

const deleteProject = async (req: Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  try {
    const project = await projectRepository
      .createQueryBuilder('project')
      .where('project.id = :id', { id: req.params.id })
      .leftJoinAndSelect('project.userCreator', 'userCreator')
      .getOne();
    if (project?.userCreator.id === userId) {
      await projectRepository.softDelete(project!.id);
      return res.status(200).json({ status: 'OK' });
    }
  } catch (e) {
    ifError('Forbidden', 403);
    return next(err);
  }
};

const getProject = async (req: Request, res:Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  try {
    const project = await projectRepository
      .createQueryBuilder('project')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('projects.id')
          .from(User, 'user')
          .leftJoin('user.projects', 'projects')
          .where('user.id = :id', { id: userId })
          .getQuery();
        return 'project.id IN ' + subQuery;
      })
      .leftJoinAndSelect('project.users', 'users')
      .leftJoinAndSelect('project.userCreator', 'userCreator')
      .getMany();
    return res.status(200).json(project);
  } catch (e) {
    console.log(e);
  }
};

const patchProject = async (req: Request, res:Response, next:NextFunction) => {
  // On vient chercher l'id de l'utilisateur connecté qui se trouve dans le token
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);

  // // si req.body.users existe, on vient boucler dedans pour récupérer les utilisateurs
  if (req.body.users) {
    // si les anciennes valeurs ne sont pas ajouté la requête elles seront écrasées
    const lastUsers = await userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.projects', 'projects')
      .where('projects.id = :id', { id: req.params.id })
      .select('user.id')
      .getMany();

    for (const key of lastUsers) {
      if (req.body.users.includes(!key.id)) {
        req.body.users.push(key.id);
      }
    }
    // req.body.users.push(userId);
    const arrayUsers: User[] = []; // User
    for (let key of req.body.users) {
      // key = chaques valeurs contenu dans req.body.users
      key = await userRepository
        .createQueryBuilder('users')
        .where('users.id = :id', { id: key })
        .getOne();
      arrayUsers.push(key);
    }
    req.body.users = arrayUsers;
    const oldProject = await projectRepository
      .createQueryBuilder('project')
      .where('project.id = :id', { id: req.params.id })
      .leftJoinAndSelect('project.users', 'users')
      .getOne();
    try {
      await projectRepository
        .createQueryBuilder('project')
      // la relation que l'on vient update
        .relation(Project, 'users')
      // le project que l'on vient update
        .of(oldProject)
        // remplace oldProject.users par arrayUsers
        .addAndRemove(arrayUsers, oldProject?.users);
      return res.status(201).json({ status: 'OK' });
    } catch (e) {
      console.log(e);
    }
  }

  if (req.body.users === undefined) {
    const itIsHisProject = await projectRepository
      .createQueryBuilder('project')
      .where('project.id = :id', { id: req.params.id })
      .leftJoinAndSelect('project.userCreator', 'userCreator')
      .leftJoinAndSelect('project.users', 'users')
      .getOne();
    if (itIsHisProject?.userCreator.id === userId) {
      const project = await projectRepository
        .createQueryBuilder()
        .update('project')
        .set(req.body)
        .where('project.id = :id', { id: req.params.id });
      if (Object.keys(req.body).length >= 1) {
      // can still send empty req :( !!
        await project.execute();
        return res.status(200).json({ status: 'OK' });
      } else {
        ifError('Bad Request', 400);
        return next(err);
      }
    }
  }
  ifError('Forbidden', 403);
  return next(err);
};

export { addproject, deleteProject, getProject, patchProject };
