import type { NextFunction, Request, Response } from 'express';
import { projectRepository, tasksRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';

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
  console.log(req.body);
  const task = await tasksRepository
    .createQueryBuilder()
    .update('tasks')
    .set(req.body)
    .where('tasks.id = :id', { id: req.params.id });
  if (Object.keys(req.body).length >= 1) {
    console.log(await task.execute());
    await task.execute();
    return res.status(200).json({ status: 'OK' });
  } else {
    ifError('Bad Request', 400);
    return next(err);
  }
};

const getTask = (req: Request, res: Response) => {
  console.log('getTask');
};

export { addTasks, deleteTasks, patchTask, getTask };
