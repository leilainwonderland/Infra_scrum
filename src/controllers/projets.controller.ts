/* eslint-disable no-console */
import type { Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { projectRepository, userRepository } from '../application.database.js';

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

const deleteProjects = async (req: Request, res:Response) => {
  console.log(deleteProjects);
};

export { addprojects, deleteProjects };
