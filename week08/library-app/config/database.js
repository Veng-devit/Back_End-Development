import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // DB_NAME
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,   // DB_HOST
    port: process.env.DB_PORT,
    dialect: 'mysql',          // mysql
    logging: false,
  }
);

export default sequelize;