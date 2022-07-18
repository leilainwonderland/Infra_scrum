import type { Request, Response } from 'express';

const login = (req:Request, res:Response) => {
  console.log(req.body);
  res.status(200).json({ req: 'ok' });
  // incert data in database here
};

export { login };
