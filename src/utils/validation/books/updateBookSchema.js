const Joi = require("joi");

const updateBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(30).messages({
    "string.empty": "Please provide the book title",
    "string.min": "Book title should be at least 1 characters",
    "string.max": "Book title should be at most 30 characters",
  }),

  author: Joi.string().trim().min(1).max(30).messages({
    "string.empty": "Please provide the book author",
    "string.min": "Author name should be at least 1 characters",
    "string.max": "Author name should be at most 30 characters",
  }),

  status: Joi.string().valid("interested", "reading", "finished").messages({
    "any.only": "Status must be one of: interested, reading, finished",
  }),
});

module.exports = updateBookSchema;
