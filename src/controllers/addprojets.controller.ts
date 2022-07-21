/* eslint-disable no-console */
import type { Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { projectRepository, userRepository } from '../application.database.js';

const addprojects = async (req:Request, res:Response) => {
  // DON'T DELETE
  // const token = req.headers.authorization!.split(' ')[1];
  const token = `${process.env.JWT_TOKEN}`;

  const userId = ((await decode(token) as JwtPayload).data);

  const users = await userRepository.findOneBy({ id: userId });

  req.body.userCreator = users!.id;
  req.body.user = users!.id;
  try {
    const project = projectRepository.create(req.body);

    await projectRepository.save(project);
    res.status(201).json({ project });
  } catch (e) {
    console.log(e);
  }
};
export { addprojects };
