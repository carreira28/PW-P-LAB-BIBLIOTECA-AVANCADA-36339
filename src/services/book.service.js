const prisma = require("../prisma/prismaClient");

const getAllBooks = async () => {
  return prisma.book.findMany();
};

module.exports = {
  getAllBooks
};