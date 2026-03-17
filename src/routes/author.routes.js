const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

router.get("/search", authorController.searchAuthors);
router.get("/", authorController.getAllAuthors);
router.post("/", authorController.createAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;