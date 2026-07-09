import { Op } from 'sequelize';
import sequelize from '../config/database.js';
import LibraryBook from '../models/LibraryBook.js';

await sequelize.sync({ force: true });
await LibraryBook.bulkCreate([
  { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, pages: 412, price: 25, stock: 3, genre: 'sci-fi' },
  { title: '1984', author: 'George Orwell', publishedYear: 1949, pages: 328, price: 18, stock: 0, genre: 'fiction' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937, pages: 310, price: 15, stock: 5, genre: 'fiction' },
  { title: 'The Alchemist', author: 'Paulo Coelho', publishedYear: 1988, pages: 208, price: 12, stock: 2, genre: 'fiction' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925, pages: 180, price: 10, stock: 0, genre: 'fiction' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', publishedYear: 1951, pages: 277, price: 22, stock: 4, genre: 'fiction' },
]);

// 1. Books that cost strictly more than $20
const expensive = await LibraryBook.findAll({
  where: { price: { [Op.gt]: 20 } },   // gt
});

// 2. Books that cost $20 or less
const affordable = await LibraryBook.findAll({
  where: { price: { [Op.lte]: 20 } },   // lte
});

// 3. Books with a price between $10 and $30 (inclusive)
const midRange = await LibraryBook.findAll({
  where: { price: { [Op.between]: [10, 30] } },   // 10, 30
});

// 4. Books that are out of stock
const outOfStock = await LibraryBook.findAll({
  where: { stock: 0 },   // 0
});

console.log('Expensive:', expensive.length);
console.log('Affordable:', affordable.length);
console.log('Mid-range:', midRange.length);
console.log('Out of stock:', outOfStock.length);