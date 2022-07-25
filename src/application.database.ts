import type { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Project } from './models/projects.model.js';
import { User } from './models/users.model.js';

let userRepository: Repository<User>;
let projectRepository: Repository<Project>;

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
    logging: false,
  });
  try {
    await connect.initialize();
    userRepository = connect
      .getRepository(User);
    projectRepository = connect
      .getRepository(Project);
    console.log('Connect to db successfully');
  } catch (e) {
    console.error(e);
  };

  // DON 'T DELETE
//   const projectData = await projectRepository.find({
//     where: {
//       user: {
//         id: 6,
//       },
//     },
//     relations: ['user'],
//   });
//   console.log(projectData);
};

export { initDatabase, userRepository, projectRepository };
