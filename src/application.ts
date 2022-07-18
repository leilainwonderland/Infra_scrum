import cors from 'cors';
import express, { json } from 'express';
import { initDatabase } from './application.database.js';
import { router } from './routes/router.user.js';

const createApp = ():express.Application => {
  const app = express();
  initDatabase();
  app.use(cors());
  app.use(json());
  // ENTER YOUR ROUTES HERE
  app.use(router);
  return app;
};

export { createApp };
