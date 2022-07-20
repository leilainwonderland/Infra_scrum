import type { Request, Response } from 'express';
import { projectRepository } from '../application.database.js';

const addprojects = async (req:Request, res:Response) => {
  console.log('addprojects');
  try {
    const Projects = projectRepository.create(req.body);
    await projectRepository.save(Projects);
    res.status(201).json(Projects);
  } catch (e) {
    console.log(e);
  }
};

export { addprojects };
