const prisma = require("../prisma/prismaClient");

const getAllBooks = async () => {
  return prisma.author.findMany();
};

module.exports = {
  getAllBooks
};