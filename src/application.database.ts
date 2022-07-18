import { DataSource } from 'typeorm';

const initDatabase = async () => {
  const connect = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'db_test',
    entities: ['src/models/*.ts'],
    synchronize: true,
  });
  try {
    await connect.initialize();
    console.log('Connect to db successfully');
  } catch (e) {
    console.error(e);
  };
};

export { initDatabase };
