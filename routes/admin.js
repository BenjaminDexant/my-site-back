const express = require("express");

const router = express.Router({ mergeParams: true });

const connection = require('../db');

router.get("/", (req, res) => {
  connection.query("SELECT * FROM Admin", (error, results) => {
    res.status(200).json(results);
  });
});

module.exports = router;
