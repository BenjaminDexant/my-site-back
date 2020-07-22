const mysql = require("mysql");

const config = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "my-site",
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

module.exports = pool;
