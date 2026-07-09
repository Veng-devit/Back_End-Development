import sequelize from '../config/database.js';
import LibraryMember from '../models/LibraryMember.js';
import LibraryBook from '../models/LibraryBook.js';

await sequelize.sync({ force: true });

const member = await LibraryMember.create({                    // .create()
  firstName: 'Sokha',
  lastName: 'Chan',
  booksBorrowedCount: 7,
});

console.log(member.getFullName());          // getFullName()  ->  "Sokha Chan"
console.log(member.isFrequentReader()); // -> true



const book = await LibraryBook.create({
  title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, pages: 412,
  price: 25, stock: 3, genre: 'sci-fi',
});
console.log(book.getAgeInYears());  // e.g. 61
console.log(book.isLongRead());         // isLongRead() -> true