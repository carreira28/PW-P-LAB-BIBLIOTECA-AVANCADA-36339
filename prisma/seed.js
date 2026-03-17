require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());


async function main() {
  const author1 = await prisma.author.create({
    data: {
      name: "George Orwell",
      nationality: "British",
      birthYear: 1903
    }
  });

  const author2 = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      nationality: "British",
      birthYear: 1965
    }
  });

  await prisma.book.createMany({
    data: [
      {
        title: "1984",
        year: 1949,
        genre: "dystopian",
        available: true,
        authorId: author1.id
      },
      {
        title: "Animal Farm",
        year: 1945,
        genre: "satire",
        available: true,
        authorId: author1.id
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        year: 1997,
        genre: "fantasy",
        available: true,
        authorId: author2.id
      }
    ]
  });

  console.log("✅ Seed executado com sucesso");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });