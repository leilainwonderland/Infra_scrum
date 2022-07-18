import cors from 'cors';
import express, { json } from 'express';
import { initDatabase } from './application.database.js';

const createApp = ():express.Application => {
  const app = express();
  initDatabase();
  app.use(cors());
  app.use(json());
  // ENTER YOUR ROUTES HERE
  return app;
};

export { createApp };
