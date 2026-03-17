const prisma = require("../prisma/prismaClient");

const getAllAuthors = async (skip, take, sortField) => {
  return await prisma.author.findMany({
    skip: skip,
    take: take,
    orderBy: { [sortField]: "asc" },
    include: { _count: { select: { books: true } } }
  });
};

const getAuthorById = async (id) => {
  return await prisma.author.findUnique({
    where: { id },
    include: { books: true } 
  });
};

const searchAuthorByName = async (name) => {
  return await prisma.author.findMany({
    where: { name: { contains: name, mode: "insensitive" } },
    include: { books: true }
  });
};

const createAuthor = async (authorData) => {
  return await prisma.author.create({ data: authorData });
};

const updateAuthor = async (id, data) => {
  return await prisma.author.update({
    where: { id },
    data
  });
};

const deleteAuthor = async (id) => {
  const author = await prisma.author.findUnique({
    where: { id },
    include: { _count: { select: { books: true } } }
  });

  if (!author) throw Object.assign(new Error("Autor não encontrado"), { status: 404 });
  if (author._count.books > 0) throw Object.assign(new Error("Não é possível apagar autor com livros"), { status: 409 });

  return await prisma.author.delete({ where: { id } });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  searchAuthorByName,
  createAuthor,
  updateAuthor,
  deleteAuthor
};