const router = require("express").Router();

const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
