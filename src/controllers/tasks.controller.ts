import type { NextFunction, Request, Response } from 'express';
import { projectRepository, tasksRepository } from '../application.database.js';

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
export { addTasks, deleteTasks };
