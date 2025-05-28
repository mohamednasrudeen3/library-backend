const express = require('express');
const { authMiddleware, authorize } = require('../middlewares/authMiddleware');
const { addBook, getBooks, updateBook, deleteBook } = require('../controllers/bookcontroller');
const router = express.Router();

router.post('/', authMiddleware, authorize('admin'),addBook);
router.get('/',authMiddleware, getBooks);
router.put('/:id',authMiddleware, authorize('admin'), updateBook);
router.delete('/:id',authMiddleware, authorize('admin'), deleteBook);

module.exports = router;
