import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Department = sequelize.define('Department', {
  name: { type: DataTypes.STRING, allowNull: false },   // STRING
});

export default Department;