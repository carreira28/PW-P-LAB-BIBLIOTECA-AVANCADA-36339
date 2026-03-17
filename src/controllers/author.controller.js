const authorService = require("../services/author.service");

const getAllAuthors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || "name";
    const authors = await authorService.getAllAuthors(skip, limit, sortField);
    res.json(authors);
  } catch (error) { next(error); }
};

const getAuthorById = async (req, res, next) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autor não encontrado" });
    res.json(author);
  } catch (error) { next(error); }
};

const getAuthorBooks = async (req, res, next) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ message: "Autor não encontrado" });
    res.json(author.books); // Apenas a lista de livros
  } catch (error) { next(error); }
};

const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) { next(error); }
};

const updateAuthor = async (req, res, next) => {
  try {
    const updated = await authorService.updateAuthor(req.params.id, req.body);
    res.json(updated);
  } catch (error) { next(error); }
};

const deleteAuthor = async (req, res, next) => {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.status) return res.status(error.status).json({ message: error.message });
    next(error);
  }
};

const searchAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.searchAuthorByName(req.query.name);
    res.json(authors);
  } catch (error) { next(error); }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  getAuthorBooks,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  searchAuthors
};