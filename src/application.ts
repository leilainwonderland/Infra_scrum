import cors from 'cors';
import express, { json } from 'express';
import { initDatabase } from './application.database.js';
import { errorRouter } from './routes/404.routes.js';
import { projectRouter } from './routes/project.routes.js';
import { taskRouter } from './routes/tasks.routes.js';
import { userRouter } from './routes/users.routes.js';

const createApp = ():express.Application => {
  const app = express();
  initDatabase();
  app.use(cors());
  app.use(json());
  // ENTER YOUR ROUTES HERE
  app.use('/users', userRouter);
  app.use('/projects', projectRouter);
  app.use('/tasks', taskRouter);
  app.use('*', errorRouter);
  return app;
};

export { createApp };
