const express = require('express');
const router = express.Router();
const movies = require('../movies');
const { checkSchema, validationResult } = require('express-validator');
const { postValidation, putValidation } = require('../validations');

router.route('/movies').get((req, res) => {
  res.json(movies.list);
});
