import { Sequelize } from 'sequelize';

const db = new Sequelize('cursonodejs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false
});

export default db;
