require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { limiter } = require("./middlewares/rateLimiters");
const { notFound, errorHandler } = require("./middlewares/errors");

const router = require("./routes");

const app = express();

app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: 'http://localhost:8081',  
  credentials: true               
}));
app.use(express.json());

app.use("/api/v1/", router);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
