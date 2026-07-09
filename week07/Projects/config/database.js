import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Week_7_sequel_sequelize', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;