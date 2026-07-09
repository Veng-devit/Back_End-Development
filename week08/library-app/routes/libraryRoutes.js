import express from 'express';
import {
  borrowBook,
  returnLoan,
  getMemberLoans,
  rateBook,
  getAverageRating,
} from '../controllers/libraryController.js';

const router = express.Router();

router.post('/loans',                   borrowBook);       // POST /loans?memberId=1&bookId=1
router.put('/loans/:id/return',         returnLoan);       // PUT  /loans/:id/return
router.get('/members/:id/loans',        getMemberLoans);   // GET  /members/:id/loans
router.post('/reviews',                 rateBook);         // POST /reviews?memberId=1&bookId=1
router.get('/books/:id/average-rating', getAverageRating); // GET  /books/:id/average-rating

export default router;
