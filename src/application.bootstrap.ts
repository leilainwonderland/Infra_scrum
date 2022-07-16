import { config } from 'dotenv';
import { createApp } from './application.js';

config({ path: 'variables.env' });

export const initAPP = async () => {
  const app = await createApp();

  try {
    app.listen(process.env.PORT, () => {
      console.log(`app runing on port : ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(`app not run error is : ${e}`);
  };
};
initAPP();
