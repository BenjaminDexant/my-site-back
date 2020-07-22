const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.DB_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
