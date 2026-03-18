const prisma = require("../prisma/prismaClient");

const getAllAuthors = async (skip, take, sortField) => {
  return await prisma.author.findMany({
    skip,
    take,
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

const getTopAuthors = async () => {
  return await prisma.author.findMany({
    include: { _count: { select: { books: true } } },
    orderBy: { books: { _count: "desc" } },
    take: 5
  });
};

const createAuthor = async (authorData) => {
  return await prisma.author.create({ data: authorData });
};

const createAuthorWithBooks = async (authorData, booksData) => {
  return await prisma.$transaction(async (tx) => {
    const author = await tx.author.create({ data: authorData });
    const books = await Promise.all(
      booksData.map((book) =>
        tx.book.create({ data: { ...book, authorId: author.id } })
      )
    );
    return { author, books };
  });
};

const updateAuthor = async (id, data) => {
  return await prisma.author.update({ where: { id }, data });
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
  getTopAuthors,
  createAuthor,
  createAuthorWithBooks,
  updateAuthor,
  deleteAuthor
};