const prisma = require("../prisma/prismaClient");

const getAllBooks = async (skip, take, sortField) => {
  return await prisma.book.findMany({
    skip: skip,
    take: take,
    orderBy: {
      [sortField]: "asc" 
    },
    include: {
      author: true
    }
  });
};

const searchBooksByTitle = async (title) => {
  return await prisma.book.findMany({
    where: {
      title: {
        contains: title,   
        mode: "insensitive"
      }
    },
    include: {
      author: true
    }
  });
};

const getLibraryStats = async () => {
  const [totalBooks, totalAuthors, availableBooks] = await Promise.all([
    prisma.book.count(),
    prisma.author.count(),
    prisma.book.count({ where: { available: true } })
  ]);

  return {
    totalBooks,
    totalAuthors,
    availableBooks,
    borrowedBooks: totalBooks - availableBooks 
  };
};

const createBook = async (bookData) => {
  const author = await prisma.author.findUnique({
    where: { id: bookData.authorId }
  });

  if (!author) {
    const error = new Error("Autor não encontrado");
    error.status = 404;
    throw error;
  }

  return await prisma.book.create({
    data: bookData
  });
};

const getBookById = async (id) => {
  return await prisma.book.findUnique({
    where: { id },
    include: { author: true }
  });
};

const updateBook = async (id, data) => {
  return await prisma.book.update({
    where: { id },
    data
  });
};

const deleteBook = async (id) => {
  return await prisma.book.delete({
    where: { id }
  });
};

module.exports = {
  getAllBooks,
  searchBooksByTitle,
  getLibraryStats,
  createBook,
  getBookById,
  updateBook,
  deleteBook
};