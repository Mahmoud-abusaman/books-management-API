const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the book title"],
      trim: true,
      minLength: [1, "Book title should be at least 1 characters"],
      maxLength: [30, "Book title should be at most 30 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide the book author"],
      trim: true,
      minLength: [1, "Author name should be at least 1 characters"],
      maxlength: [30, "Author name should be at most 30 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "reading", "finished"],
        message: "Status must be one of: interested, reading, finished",
      },
      default: "interested",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User should be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
