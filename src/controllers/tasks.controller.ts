import type { NextFunction, Request, Response } from 'express';
import { projectRepository, tasksRepository } from '../application.database.js';
import { err, ifError } from '../middlewares/error.middleware.js';

const addTasks = async (req: Request, res: Response) => {
  const projectId = req.body.project;
  const project = await projectRepository.findOneBy({ id: projectId });
  req.body.project = project;
  try {
    const task = tasksRepository.create(req.body);
    await tasksRepository.save(task);
    return res.status(201).json({ status: 'OK' });
  } catch (e) {
    console.log(e);
  }
};

const deleteTasks = async (req: Request, res: Response) => {
  console.log('deleteTasks');
  const task = await tasksRepository.findOneBy({ id: req.body.id });
  await tasksRepository.softDelete(task!.id);
  return res.status(200).json({ status: 'OK' });
};

const patchTask = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body);
  const task = await tasksRepository
    .createQueryBuilder()
    .update('tasks')
    .set(req.body)
    .where('tasks.id = :id', { id: req.params.id });
  if (Object.keys(req.body).length >= 2) {
    console.log(await task.execute());
    await task.execute();
    return res.status(200).json({ status: 'OK' });
  } else {
    ifError('Bad Request', 400);
    return next(err);
  }
};

export { addTasks, deleteTasks, patchTask };
