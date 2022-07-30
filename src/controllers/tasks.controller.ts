import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { projectRepository, tasksRepository, userRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';
import { Tasks } from '../models/tasks.model.js';
import type { User } from '../models/users.model.js';

const addTask = async (req: Request, res: Response, next:NextFunction) => {
  const project = await projectRepository
    .createQueryBuilder('project')
    .where('project.id = :id', { id: req.params.id })
    .getOne();
  if (project !== null) {
    try {
      req.body.project = project.id; // TMP
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

const deleteTask = async (req: Request, res: Response, next:NextFunction) => {
  if (Object.keys(req.params).length !== 0) {
    const task = await tasksRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id: req.params.id })
      .getOne();
    await tasksRepository.delete(task!.id);
    return res.status(200).json({ status: 'OK' });
  }

  ifError('Bad Request', 400);
  return next(err);
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
  const project = await projectRepository
    .createQueryBuilder('project')
    .where('project.id = :id', { id: req.params.id })
    .leftJoinAndSelect('project.tasks', 'tasks')
    .getMany()
  ;
  return res.status(200).json({ project });
};

const getTaskByUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);

  const tasks = await tasksRepository
    .createQueryBuilder('tasks')
    .leftJoinAndSelect('tasks.users', 'users')
    .having('users.id =:id', { id: userId }) // TMP SAME PROBLEME
    .getMany()
  ;
  return res.status(200).json({ tasks });
};

export { addTask, deleteTask, patchTask, getTaskByProject, getTaskByUser };
