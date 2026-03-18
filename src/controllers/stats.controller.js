const bookService = require("../services/book.service");

const getStats = async (req, res, next) => {
  try {
    const stats = await bookService.getLibraryStats();
    res.status(200).json(stats);
  } catch (error) { next(error); }
};

const getStatsByGenre = async (req, res, next) => {
  try {
    const genres = await bookService.getStatsByGenre();
    res.status(200).json(genres);
  } catch (error) { next(error); }
};

module.exports = { getStats, getStatsByGenre };