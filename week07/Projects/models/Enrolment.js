// models/Enrolment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Enrolment = sequelize.define('Enrolment', {
  grade: { type: DataTypes.STRING },   // extra column on the junction table
});

export default Enrolment;