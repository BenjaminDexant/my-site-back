const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const admin = require("./routes/admin");
const article = require("./routes/article");
const tag = require("./routes/tag");
const login = require("./routes/login");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");  
  next();
});

app.use("/admin", admin);
app.use("/articles", article);
app.use("/tags", tag);
app.use("/login", login);

const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
