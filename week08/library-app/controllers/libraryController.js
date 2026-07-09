import { LibraryMember, LibraryBook, Loan, Review } from '../models/index.js';

// POST /loans?memberId=1&bookId=1
export async function borrowBook(req, res) {
  const { memberId, bookId } = req.query;   // query — read query params

  try {
    const member = await LibraryMember.findByPk(memberId);
    const book   = await LibraryBook.findByPk(bookId);

    await member.addBorrowedBooks(book, {   // addBorrowedBooks
      through: { borrowedAt: new Date(), returnedAt: null },
    });

    res.status(201).json({ message: 'Book borrowed' });   // 201
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /loans/:id/return
export async function returnLoan(req, res) {
  const { id } = req.params;   // route param

  try {
    const loan = await Loan.findByPk(id);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    await loan.update({ returnedAt: new Date() });   // set returnedAt to today

    res.json({ message: 'Loan returned', loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /members/:id/loans  — eager loading (Ex 7)
export async function getMemberLoans(req, res) {
  const { id } = req.params;

  try {
    const member = await LibraryMember.findByPk(id, {
      include: { model: LibraryBook, as: 'BorrowedBooks' },   // eager loading
    });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member.BorrowedBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /reviews?memberId=1&bookId=1
export async function rateBook(req, res) {
  const { memberId, bookId } = req.query;
  const { rating } = req.body;

  try {
    const member = await LibraryMember.findByPk(memberId);
    const book   = await LibraryBook.findByPk(bookId);

    await member.addReviewedBooks(book, {
      through: { rating },   // rating from request body
    });

    res.status(201).json({ message: 'Book rated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /books/:id/average-rating  — averaging logic (Ex 8)
export async function getAverageRating(req, res) {
  const { id } = req.params;

  try {
    const book = await LibraryBook.findByPk(id, {
      include: { model: LibraryMember, as: 'Reviewers' },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.Reviewers.length === 0) {
      return res.json({ average: null, message: 'No reviews yet' });
    }

    const sum     = book.Reviewers.reduce((acc, r) => acc + r.Review.rating, 0);
    const average = sum / book.Reviewers.length;

    res.json({ title: book.title, average });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
