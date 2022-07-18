import cors from 'cors';
import express, { json } from 'express';
import { Express, Request, Response } from 'express';
import { router } from './routes/router.user.js';


const createApp = ():express.Application => {
  const app = express();
  app.use(cors());
  app.use(json());
  // ENTER YOUR ROUTES HERE
  app.use(router);
  return app;
};

export { createApp };
