const express = require("express");
require("dotenv").config();

const admin = require('./routes/admin');
const article = require('./routes/article');
const tag = require('./routes/tag');

const app = express();
const PORT = process.env.DB_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', admin);
app.use('/article', article);
app.use('/tag', tag);

const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
