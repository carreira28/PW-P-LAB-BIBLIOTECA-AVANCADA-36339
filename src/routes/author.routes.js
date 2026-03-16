const express = require("express");
const router = express.Router();
const { getAllAuthors, createAuthor } = require("../controllers/author.controller");

router.get("/", getAllAuthors);
router.post("/", createAuthor);

module.exports = router;