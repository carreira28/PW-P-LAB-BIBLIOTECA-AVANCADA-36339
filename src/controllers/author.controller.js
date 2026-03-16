const authorService = require("../services/author.service");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors(req.query);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors
};