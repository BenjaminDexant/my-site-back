require('dotenv').config();
const mysql = require('mysql');

const config = {
    host: proces.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  };

const pool = mysql.createPool(config);

module.exports = pool;