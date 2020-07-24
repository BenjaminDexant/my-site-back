const router = require('express').Router();
const bcrypt = require('bcrypt');
const util = require('util');
const connection = require('../db');

const queryAsync = util.promisify(connection.query).bind(connection);
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  try {
    const users = await queryAsync('SELECT * FROM Admin WHERE name = ?', name);
    if (!users) {
      return res.status(500).json({
        status: 'error',
        errorMessage: 'Data does not match',
      });
    }
    const checkPass = bcrypt.compareSync(password, users[0].password);
    delete users[0].password;
    if (checkPass) {
      return res.status(200).json({
        ...users[0],
      });
    }
    return res.status(500).json({
      status: 'error',
      errorMessage: 'Invalid data',
    });
  } catch (err) {
      console.log(err);
    return res.status(500).json({
      status: 'err',
      errorMessage: 'Something went wrong',
    });
  }
});

module.exports = router;