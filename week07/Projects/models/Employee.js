import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Employee = sequelize.define('Employee', {
  name:     { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING },
});

export default Employee;
