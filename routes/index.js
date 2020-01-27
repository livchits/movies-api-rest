const express = require('express');
const router = express.Router();
const movies = require('../movies');

router.route('/movies').get((req, res) => {
  res.json(movies.list);
});
