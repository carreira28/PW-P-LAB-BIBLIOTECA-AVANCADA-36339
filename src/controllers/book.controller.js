const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks(req.query);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks
};