const prisma = require("../prisma/prismaClient");

const getAllAuthors = async (skip, take, sortField = "name") => {
  return await prisma.author.findMany({
    skip: skip,
    take: take,
    orderBy: {
      [sortField]: "asc"
    },
    include: {
      books: true 
    }
  });
};

const searchAuthorByName = async (name) => {
  return await prisma.author.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    },
    include: {
      books: true
    }
  });
};

const createAuthor = async (authorData) => {
  return await prisma.author.create({
    data: authorData
  });
};

const deleteAuthor = async (id) => {
  const author = await prisma.author.findUnique({
    where: { id },
    include: { _count: { select: { books: true } } }
  });

  if (!author) {
    const error = new Error("Autor não encontrado");
    error.status = 404;
    throw error;
  }

  if (author._count.books > 0) {
    const error = new Error("Não é possível apagar um autor com livros associados");
    error.status = 409;
    throw error;
  }

  return await prisma.author.delete({ where: { id } });
};

module.exports = {
  getAllAuthors,
  searchAuthorByName,
  createAuthor,
  deleteAuthor
};