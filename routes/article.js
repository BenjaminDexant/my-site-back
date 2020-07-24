const express = require("express");

const router = express.Router({ mergeParams: true });

const connection = require("../db");

router.post("/", (req, res) => {
  const { body } = req;
  let date;
  date = new Date();
  date = `${date.getUTCFullYear()}-${
    (`00${date.getUTCMonth() + 1}`).slice(-2)}-${
    (`00${date.getUTCDate()}`).slice(-2)} ${
    (`00${date.getHours()}`).slice(-2)}:${
    (`00${date.getUTCMinutes()}`).slice(-2)}:${
    (`00${date.getUTCSeconds()}`).slice(-2)}`;
  try {
    const query = "INSERT INTO Article SET ?, date=?";
    connection.query(query, [body, date], (error, results) => {
      if (error) {
        res.status(500).json({
          status: error,
          errorMessage:
            "Our server encountered an error performing the request",
        });
      } else {
        connection.query(
          "SELECT * FROM Article WHERE id_article=?",
          [results.insertId],
          (err, article) => {
            if (err) {
              res.status(500).json({
                status: err,
                errorMessage:
                  "Our server encountered an error performing the request",
              });
            } else {
              res.status(201).json(article[0]);
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

router.delete("/:id_article", (req, res) => {
  const { id_article: idArticle } = req.params;
  try {
    connection.query(
      "DELETE FROM Article WHERE `id_article`= ?",
      idArticle,
      (err, results) => {
        if (err) {
          res.status(500).json({
            status: "error",
            errorMessage:
              "Our server encountered an error performing the request",
          });
        } else if (results.affectedRows === 0) {
          res.status(404).json({
            status: "error",
            errorMessage: "Article not found",
          });
        } else {
          res.sendStatus(204);
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      status: "error",
      errorMessage: "Our server encountered an error",
    });
  }
});

router.put("/:id_article", (req, res) => {
  const { body: formData } = req;
  const { id_article: idArticle } = req.params;
  try {
    const query = "UPDATE Article SET ? WHERE `id_article` = ?";
    connection.query(query, [formData, idArticle], (error) => {
      if (error) {
        res.status(500).json({
          error: "error",
          errorMessage:
            "Our server encountered an error performing the request",
        });
      } else {
        connection.query(
          "SELECT * FROM Article WHERE id_article = ?",
          idArticle,
          (err, article) => {
            if (err) {
              res.status(404).json({
                status: "error",
                errorMessage: "Article not found",
              });
            } else {
              res.status(200).json(article[0]);
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
  connection.query("SELECT * FROM Article", (error, results) => {
    res.status(200).json(results);
  });
});

router.get("/:id_article", (req, res) => {
  const { id_article: idArticle } = req.params;
  const query = `SELECT * FROM Article WHERE id_article=?`;
  try {
    connection.query(query, idArticle, (err, article) => {
      if (err) {
        res.status(500).json({
          status: "error",
          errorMessage:
            "Our server encountered an error performing the request",
        });
      } else {
        res.status(200).json(article);
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errorMessage: "Our server encountered an error",
    });
  }
});

module.exports = router;
