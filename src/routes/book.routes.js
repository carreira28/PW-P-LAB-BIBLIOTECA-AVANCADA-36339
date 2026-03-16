const express = require("express");
const router = express.Router();
const { getAllBooks, createBook } = require("../controllers/book.controller");

router.get("/", getAllBooks);
router.post("/", createBook);

module.exports = router;