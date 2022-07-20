import type { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Projects } from './models/project.model.js';
import { User } from './models/users.model.js';

let userRepository: Repository<User>;
let projectRepository: Repository<Projects>;

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
    userRepository = connect.getRepository(User);
    projectRepository = connect.getRepository(Projects);
    console.log('Connect to db successfully');
  } catch (e) {
    console.error(e);
  };
};

export { initDatabase, userRepository, projectRepository };
