const express = require('express');
const router = express.Router();
const movies = require('../movies');
const { checkSchema, validationResult } = require('express-validator');
const { postValidation, putValidation } = require('../validations');

router
  .route('/movies')
  .get((req, res) => {
    res.json(movies.list);
  })
  .post(checkSchema(postValidation), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('400 - Bad Request');
      //err.status = 400;
      return next(err);
    }

    return res.json(movies.addMovie(req.body));
  });
