const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

router.get("/search", authorController.searchAuthors);
router.get("/top", authorController.getTopAuthors);
router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.get("/:id/books", authorController.getAuthorBooks);
router.post("/", authorController.createAuthor);
router.post("/with-books", authorController.createAuthorWithBooks);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;