const router = require("express").Router();

const { authenticateUser } = require("../middlewares/auth");
const authRoutes = require("./auth");
const booksRoutes = require("./books");

router.use("/auth", authRoutes);
router.use("/books", authenticateUser, booksRoutes);

module.exports = router;
