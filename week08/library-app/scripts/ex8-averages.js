import { sequelize, LibraryMember, LibraryBook } from '../models/index.js';

await sequelize.sync({ force: true });

// ── Seed: 3 members ───────────────────────────────────────────────────────────
const [alice, bob, ronan] = await LibraryMember.bulkCreate([
  { firstName: 'Alice' },
  { firstName: 'Bob'   },
  { firstName: 'Ronan' },
]);

// ── Seed: 2 books ─────────────────────────────────────────────────────────────
const [dune, hobbit] = await LibraryBook.bulkCreate([
  { title: 'Dune',       author: 'Frank Herbert', publishedYear: 1965, pages: 412 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937, pages: 310 },
]);

// ── Every member rates every book ─────────────────────────────────────────────
await alice.addReviewedBooks(dune,   { through: { rating: 4.5 } });
await bob.addReviewedBooks(dune,     { through: { rating: 3.0 } });
await ronan.addReviewedBooks(dune,   { through: { rating: 4.0 } });

// also rate "hobbit" for each member with a score of your choice
await alice.addReviewedBooks(hobbit, { through: { rating: 5.0 } });
await bob.addReviewedBooks(hobbit,   { through: { rating: 4.0 } });
await ronan.addReviewedBooks(hobbit, { through: { rating: 3.5 } });

console.log('Seed complete — all members have rated both books.\n');

// ── Q3: Average rating per book ───────────────────────────────────────────────
const books = await LibraryBook.findAll({
  include: { model: LibraryMember, as: 'Reviewers' },   // 'Reviewers'
});

for (const book of books) {
  let sum = 0;
  for (const reviewer of book.Reviewers) {
    sum += reviewer.Review.rating;   // .Review
  }
  const average = sum / book.Reviewers.length;   // .length
  console.log(`${book.title} average rating: ${average}`);
}

// ── Q3: Average rating given by each member ───────────────────────────────────
const members = await LibraryMember.findAll({
  include: { model: LibraryBook, as: 'ReviewedBooks' },
});

for (const member of members) {
  let sum = 0;
  for (const book of member.ReviewedBooks) {   // .ReviewedBooks
    sum += book.Review.rating;
  }
  const average = sum / member.ReviewedBooks.length;
  console.log(`${member.firstName} average rating given: ${average}`);
}

await sequelize.close();
