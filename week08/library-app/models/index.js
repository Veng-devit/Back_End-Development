import sequelize from '../config/database.js';
import LibraryMember from './LibraryMember.js';
import LibraryBook from './LibraryBook.js';
import Loan from './Loan.js';
import Review from './Review.js';

// Sequelize will create a junction table automatically
LibraryMember.belongsToMany(LibraryBook, { through: 'Favorites' });   // belongsToMany, 'Favorites'
LibraryBook.belongsToMany(LibraryMember, { through: 'Favorites' });   // belongsToMany

LibraryMember.belongsToMany(LibraryBook, { through: Loan, as: 'BorrowedBooks' });   // Loan
LibraryBook.belongsToMany(LibraryMember, { through: Loan, as: 'Borrowers' });

LibraryMember.belongsToMany(LibraryBook, { through: Review, as: 'ReviewedBooks' });   // belongsToMany
LibraryBook.belongsToMany(LibraryMember, { through: Review, as: 'Reviewers' });       // 'Reviewers'

export { sequelize, LibraryMember, LibraryBook, Loan, Review };

