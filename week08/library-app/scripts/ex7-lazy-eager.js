import { sequelize, LibraryMember, LibraryBook } from '../models/index.js';

await sequelize.sync({ force: true });

// ── Seed: 3 members ──────────────────────────────────────────────────────────
const [sokha, dara, mony] = await LibraryMember.bulkCreate([
  { firstName: 'Sokha', lastName: 'Chan' },
  { firstName: 'Dara',  lastName: 'Pich' },
  { firstName: 'Mony',  lastName: 'Keo'  },
]);

// ── Seed: 3 books ─────────────────────────────────────────────────────────────
const [dune, foundation, neuromancer] = await LibraryBook.bulkCreate([
  { title: 'Dune',        author: 'Frank Herbert',  publishedYear: 1965, pages: 412, genre: 'sci-fi' },
  { title: 'Foundation',  author: 'Isaac Asimov',   publishedYear: 1951, pages: 255, genre: 'sci-fi' },
  { title: 'Neuromancer', author: 'William Gibson', publishedYear: 1984, pages: 271, genre: 'sci-fi' },
]);

// ── Seed: a few loans ────────────────────────────────────────────────────────
await sokha.addBorrowedBooks(dune,        { through: { borrowedAt: '2025-05-01', returnedAt: null } });
await sokha.addBorrowedBooks(foundation,  { through: { borrowedAt: '2025-05-10', returnedAt: null } });
await dara.addBorrowedBooks(neuromancer,  { through: { borrowedAt: '2025-06-01', returnedAt: null } });
await mony.addBorrowedBooks(dune,         { through: { borrowedAt: '2025-06-15', returnedAt: null } });
await mony.addBorrowedBooks(neuromancer,  { through: { borrowedAt: '2025-06-20', returnedAt: null } });

// ─────────────────────────────────────────────────────────────────────────────
// Q1 – LAZY LOADING (N+1 problem)
// This issues 1 query to get all members, then 1 more query PER member
// to fetch their books → with 20 members that is 1 + 20 = 21 queries total.
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Q1: Lazy Loading (N+1 problem) ──────────────────────────────');

const members = await LibraryMember.findAll();

for (const member of members) {
  const books = await member.getBorrowedBooks();   // extra query per member
  console.log(`${member.firstName}:`, books.map(b => b.title));
}

/*
  Q1 Answers
  ──────────────────────────────────────────────────────────────────────────────
  How many SQL queries run if there are 20 members?
    → 21 queries: 1 to fetch all members + 1 per member to fetch their books.

  Why is this inefficient?
    → Each loop iteration fires a separate database round-trip. As the number
       of members grows, the number of queries grows linearly (N+1), putting
       unnecessary load on the database and slowing down the application.
*/

// ─────────────────────────────────────────────────────────────────────────────
// Q2 – EAGER LOADING (fix with include)
// All data is fetched in a single JOIN query.
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Q2: Eager Loading (single query) ────────────────────────────');

const membersEager = await LibraryMember.findAll({
  include: { model: LibraryBook, as: 'BorrowedBooks' },   // include
});

for (const member of membersEager) {
  const books = member.BorrowedBooks;   // .BorrowedBooks (property added by eager loading)
  console.log(`${member.firstName}:`, books.map(b => b.title));
}

// ─────────────────────────────────────────────────────────────────────────────
// Q3 – FILTER ON THE INCLUDED MODEL
// Find every member who has ever borrowed 'Dune', in a single query.
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Q3: Filter on included model ─────────────────────────────────');

const duneReaders = await LibraryMember.findAll({
  include: {
    model: LibraryBook,          // LibraryBook
    as: 'BorrowedBooks',
    where: { title: 'Dune' },   // 'Dune'
  },
});

console.log(duneReaders.map(m => m.firstName));

await sequelize.close();
