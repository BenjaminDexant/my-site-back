const express = require("express");

const router = express.Router({ mergeParams: true });

const connection = require("../db");

router.post("/", (req, res) => {
  const { body } = req;
  try {
    const query = "INSERT INTO Tag SET ?";
    connection.query(query, body, (error, results) => {
      if (error) {
        res.status(500).json({
          status: error,
          errorMessage:
            "Our server encountered an error performing the request",
        });
      } else {
        connection.query(
          "SELECT * FROM Tag WHERE id_tag=?",
          results.insertId,
          (err, tag) => {
            if (err) {
              res.status(500).json({
                status: err,
                errorMessage:
                  "Our server encountered an error performing the request",
              });
            } else {
              res.status(201).json(tag[0]);
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errorMessage: "Our server encountered an error",
    });
  }
});

router.get("/", (req, res) => {
  const { name: TagName } = req.query;
  if (TagName) {
    query =
      "SELECT * FROM Article JOIN Tag ON Article.id_article = Tag.id_article AND Tag.name = ?";
    try {
      connection.query(query, TagName, (err, results) => {
        if (err) {
          res.status(500).json({
            status: "error",
            errorMessage:
              "Our server encountered an error performing the request",
          });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        errorMessage: "Our server encountered an error",
      });
    }
  } else {
    connection.query("SELECT * FROM Tag", (error, tags) => {
      res.status(200).json(tags);
    });
  }
});

module.exports = router;
