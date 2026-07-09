import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LibraryMember = sequelize.define('LibraryMember', {          // .define()
  firstName:          DataTypes.STRING,
  lastName:           DataTypes.STRING,
  booksBorrowedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// Add an instance method on the model's prototype
LibraryMember.prototype.getFullName = function () {              // .prototype
  return `${this.firstName} ${this.lastName}`;                   // this.lastName
};

// Add a second instance method: true if booksBorrowedCount >= 5
LibraryMember.prototype.isFrequentReader = function () {
  return this.booksBorrowedCount >= 5;                     // >=
};

export default LibraryMember;