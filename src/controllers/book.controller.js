const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || "title";
    const books = await bookService.getAllBooks(skip, limit, sortField);
    res.status(200).json(books);
  } catch (error) { next(error); }
};

const searchBooks = async (req, res, next) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: "O parâmetro 'title' é obrigatório." });
    }
    const books = await bookService.searchBooksByTitle(title);
    res.status(200).json(books);
  } catch (error) { next(error); }
};

const createBook = async (req, res, next) => {
  const { title, year, genre, authorId } = req.body;

  if (!title || !year || !genre || !authorId) {
    return res.status(400).json({ message: "Campos obrigatórios em falta: title, year, genre, authorId" });
  }
  if (isNaN(year)) {
    return res.status(400).json({ message: "O campo 'year' deve ser um número." });
  }

  try {
    const newBook = await bookService.createBook({
      title,
      year: parseInt(year),
      genre,
      authorId
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });
    res.json(book);
  } catch (error) { next(error); }
};

const updateBook = async (req, res, next) => {
  try {
    const exists = await bookService.getBookById(req.params.id);
    if (!exists) return res.status(404).json({ message: "Livro não encontrado" });
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
  } catch (error) { next(error); }
};

const deleteBook = async (req, res, next) => {
  try {
    const exists = await bookService.getBookById(req.params.id);
    if (!exists) return res.status(404).json({ message: "Livro não encontrado" });
    await bookService.deleteBook(req.params.id);
    res.status(204).send();
  } catch (error) { next(error); }
};

module.exports = {
  getAllBooks,
  searchBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
};