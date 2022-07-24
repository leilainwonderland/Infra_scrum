import { config } from 'dotenv';
import { createApp } from './application.js';

config({ path: 'variables.env' });

export const initAPP = async () => {
  const app = await createApp();

  try {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`app runing on port : ${process.env.PORT}`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`app not run error is : ${e}`);
  };
};
initAPP();
