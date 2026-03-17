const authorService = require("../services/author.service");

const getAllAuthors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const take = limit;

    const sortField = req.query.sort || "name";

    const authors = await authorService.getAllAuthors(skip, take, sortField);

    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const searchAuthors = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "O parâmetro 'name' é obrigatório." });
    }

    const authors = await authorService.searchAuthorByName(name);
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const { name, nationality, birthYear } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O campo 'name' é obrigatório." });
    }

    const newAuthor = await authorService.createAuthor({ 
      name, 
      nationality, 
      birthYear: birthYear ? parseInt(birthYear) : null 
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    await authorService.deleteAuthor(id);
    res.status(204).send(); 
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  searchAuthors,
  createAuthor,
  deleteAuthor
};