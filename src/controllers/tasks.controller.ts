import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
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

const deleteTasks = async (req: Request, res: Response, next: NextFunction) => {
  console.log('deleteTasks');
  const task = await tasksRepository.findOneBy({ id: req.body.id });
  await tasksRepository.delete(task!.id);
  return res.status(200).json({ status: 'OK' });
};

const patchTask = async (req: Request, res: Response, next: NextFunction) => {
  console.log('patchTask');
  const token = req.headers.authorization!.split(' ')[1];
  const userId = await ((decode(token) as JwtPayload).data);
  const taskByUserInProject = await tasksRepository
    .createQueryBuilder('task')
    .where('task.id = :id', { id: req.body.id })
    .leftJoinAndSelect('task.project', 'project')
    .getOne();
  if (taskByUserInProject?.project.userCreator.id === userId) {
    const task = await tasksRepository
      .createQueryBuilder()
      .update('Tasks')
      .set({
        name: req.body.name,
        status: req.body.status,
        description: req.body.description,
        priority: req.body.priority,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        roles: req.body.roles,
        users: req.body.users,
      })
      .where('id = :id', { id: req.body.id })
      .execute();
    return res.status(200).json({ status: 'OK' });
  }
  ifError('Forbidden', 403);
  return next(err);
}


export { addTasks, deleteTasks, patchTask };
