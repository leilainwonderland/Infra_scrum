import cors from 'cors';
import express, { json } from 'express';

const createApp = ():express.Application => {
  const app = express();
  app.use(cors());
  app.use(json());
  // ENTER YOUR ROUTES HERE
  return app;
};

export { createApp };
