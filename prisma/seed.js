require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const author1 = await prisma.author.create({
    data: { name: "George Orwell", nationality: "British", birthYear: 1903 }
  });

  const author2 = await prisma.author.create({
    data: { name: "J.K. Rowling", nationality: "British", birthYear: 1965 }
  });

  const author3 = await prisma.author.create({
    data: { name: "José Saramago", nationality: "Portuguese", birthYear: 1922 }
  });

  const author4 = await prisma.author.create({
    data: { name: "Agatha Christie", nationality: "British", birthYear: 1890 }
  });

  const author5 = await prisma.author.create({
    data: { name: "Gabriel García Márquez", nationality: "Colombian", birthYear: 1927 }
  });

  await prisma.book.createMany({
    data: [
      // George Orwell
      { title: "1984", year: 1949, genre: "dystopian", available: true, authorId: author1.id },
      { title: "Animal Farm", year: 1945, genre: "satire", available: false, authorId: author1.id },
      { title: "Homage to Catalonia", year: 1938, genre: "non-fiction", available: true, authorId: author1.id },

      // J.K. Rowling
      { title: "Harry Potter and the Philosopher's Stone", year: 1997, genre: "fantasy", available: true, authorId: author2.id },
      { title: "Harry Potter and the Chamber of Secrets", year: 1998, genre: "fantasy", available: false, authorId: author2.id },
      { title: "Harry Potter and the Prisoner of Azkaban", year: 1999, genre: "fantasy", available: true, authorId: author2.id },

      // José Saramago
      { title: "Ensaio sobre a Cegueira", year: 1995, genre: "literary fiction", available: true, authorId: author3.id },
      { title: "O Evangelho Segundo Jesus Cristo", year: 1991, genre: "literary fiction", available: true, authorId: author3.id },
      { title: "Memorial do Convento", year: 1982, genre: "historical fiction", available: false, authorId: author3.id },

      // Agatha Christie
      { title: "Murder on the Orient Express", year: 1934, genre: "mystery", available: true, authorId: author4.id },
      { title: "And Then There Were None", year: 1939, genre: "mystery", available: true, authorId: author4.id },
      { title: "The ABC Murders", year: 1936, genre: "mystery", available: false, authorId: author4.id },

      // Gabriel García Márquez
      { title: "One Hundred Years of Solitude", year: 1967, genre: "magical realism", available: true, authorId: author5.id },
      { title: "Love in the Time of Cholera", year: 1985, genre: "literary fiction", available: true, authorId: author5.id },
      { title: "Chronicle of a Death Foretold", year: 1981, genre: "magical realism", available: false, authorId: author5.id },
    ]
  });

  console.log("✅ Seed executado com sucesso — 5 autores e 15 livros criados");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });