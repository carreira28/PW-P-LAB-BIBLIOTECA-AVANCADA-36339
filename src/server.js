require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authorRoutes = require("./routes/author.routes");
const bookRoutes = require("./routes/book.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware global de erro
app.use(errorMiddleware);

const PORT = process.env.SERVER_PORT || 3000;

// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
  });
}

// Para a Vercel
module.exports = app;