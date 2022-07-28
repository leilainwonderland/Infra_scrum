import type { NextFunction, Request, Response } from 'express';
import { decode, JwtPayload } from 'jsonwebtoken';
import { projectRepository, tasksRepository, userRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';
import { Tasks } from '../models/tasks.model.js';
import type { User } from '../models/users.model.js';

const addTasks = async (req: Request, res: Response, next:NextFunction) => {
  const projectId = req.body.project;
  const project = await projectRepository.findOneBy({ id: projectId });
  req.body.project = project;
  if (project !== null) {
    try {
      const task = tasksRepository.create(req.body);
      await tasksRepository.save(task);
      return res.status(201).json({ status: 'OK' });
    } catch (e) {
      console.log(e);
    }
  }
  ifError('Bad Request', 400);
  return next(err);
};

const deleteTasks = async (req: Request, res: Response, next:NextFunction) => {
  console.log('deleteTasks');
  try {
    if (Object.keys(req.body).length !== 0) {
      const task = await tasksRepository.findOneBy({ id: req.body.id });
      await tasksRepository.softDelete(task!.id);
      return res.status(200).json({ status: 'OK' });
    }
  } catch (e) {
    ifError('Bad Request', 400);
    return next(err);
  }
};

const patchTask = async (req: Request, res: Response, next: NextFunction) => {
  // si req.body.users existe, on vient boucler dedans pour récupérer les utilisateurs
  if (req.body.users) {
  // si les anciennes valeurs ne sont pas ajouté la requête elles seront écrasées
    const lastUsers = await userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tasks', 'tasks')
      .where('tasks.id = :id', { id: req.params.id })
      .select('user.id')
      .getMany();

    // Par défaut les tasks n'on pas de users
    if (lastUsers.length > 0) {
      for (const key of lastUsers) {
        req.body.users.push(key.id);
      }
    }

    const arrayUsers: User[] = [];
    for (let key of req.body.users) {
      // key = chaques valeurs contenu dans req.body.user
      key = await userRepository
        .createQueryBuilder('users')
        .where('users.id = :id', { id: key })
        .getOne();
      // on vient ajouter à arrayUsers les Repository des users
      arrayUsers.push(key);
    }
    // // Je ne sais plus, sorry. :(
    req.body.users = arrayUsers;
    const oldTask = await tasksRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id: req.params.id })
      .leftJoinAndSelect('task.users', 'users')
      .getOne();

    try {
      await tasksRepository
        .createQueryBuilder('task')
      // la relation que l'on vient update
        .relation(Tasks, 'users')
      // le project que l'on vient update
        .of(oldTask)
      // remplace oldProject.users par arrayUsers
        .addAndRemove(arrayUsers, oldTask?.users);
      return res.status(201).json({ status: 'OK' });
    } catch (e) {
      console.log(e);
    }
  }
  if (req.body.users === undefined) {
    const task = await tasksRepository
      .createQueryBuilder()
      .update('tasks')
      .set(req.body)
      .where('tasks.id = :id', { id: req.params.id });
    if (Object.keys(req.body).length >= 1) {
      await task.execute();
      return res.status(200).json({ status: 'OK' });
    } else {
      ifError('Bad Request', 400);
      return next(err);
    }
  }
};

const getTaskByProject = async (req: Request, res: Response) => {
  console.log('getTask');
  const tasks = await tasksRepository
    .createQueryBuilder('tasks')
    .where('tasks.projectId = :id', { id: req.body.id })
    .getMany()
  ;
  return res.status(200).json({ tasks });
};

const getTaskByUser = async (req: Request, res: Response) => {
  console.log('getTask');
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const tasks = await tasksRepository
    .createQueryBuilder('tasks')
    .leftJoinAndSelect('tasks.user', 'user')
    .where('tasks.userId = :id', { id: userId })
    .getMany()
  ;
  return res.status(200).json({ tasks });
};



export { addTasks, deleteTasks, patchTask, getTaskByProject, getTaskByUser };