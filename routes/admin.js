const express = require("express");

const router = express.Router({ mergeParams: true });

const util = require("util");
const bcrypt = require("bcrypt");

const connection = require("../db");

const queryAsync = util.promisify(connection.query).bind(connection);

const saltRounds = 10;

// inscription
router.post("/", async (req, res) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const inscData = {
    ...req.body,
    password: hash,
  };
  try {
    const { name } = req.body;
    const users = await queryAsync("SELECT * FROM Admin WHERE name = ?", name);
    if (users[0]) {
      return res.status(409).json({
        status: "error",
        errorMessage: "User already exist",
      });
    }
    const query = "INSERT INTO Admin SET ?";
    const result = await queryAsync(query, inscData);
    return res.status(201).json({
      id_admin: result.insertId,
      ...inscData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      errorMessage: "Something went wrong",
    });
  }
});

module.exports = router;
