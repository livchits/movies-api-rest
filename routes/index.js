const express = require('express');
const router = express.Router();
const movies = require('../movies');
const { checkSchema, validationResult } = require('express-validator');
const { postValidation, putValidation } = require('../validations');

router
  .route('/movies')
  .get((req, res) => {
    //chequea que el objeto query no esté vacío
    if (Object.keys(req.query).length) {
      //toma el valor de la query string y lo pasa a minúsculas
      const orderCriteria = Object.values(req.query)[0].toLowerCase();
      if (orderCriteria === 'title') {
        return res.json(movies.orderByTitle());
      }
      if (orderCriteria === 'year') {
        return res.json(movies.orderByYear());
      }

      const criteria = req.query;
      const filteredMovies = movies.filterByCriteria(criteria);
      return res.json(filteredMovies);
    }
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

router.route('/movies/genres').get((req, res) => {
  const propsList = movies.getMoviesProps('genre');
  return res.json(propsList);
});

router.route('/movies/years').get((req, res) => {
  const propsList = movies.getMoviesProps('year');
  return res.json(propsList);
});

router
  .route('/movies/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    const movieWithId = movies.getMovieById(Number(id));
    if (movieWithId) {
      return res.json(movieWithId);
    }
    const err = new Error(`404 - The movie with the id ${id} was not found`);
    err.status = 404;
    return next(err);
  })
  .put(checkSchema(putValidation), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('400 - Bad Request');
      //err.status = 400;
      return next(err);
    }

    const { id } = req.params;
    if (!movies.movieById(id)) {
      return res.json(movies.addMovie(req.body));
    }
    return res.json(movies.updateMovie(id, req.body));
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    if (!movies.getMovieById(Number(id))) {
      const err = new Error(`404 - The movie with the id ${id} was not found`);
      err.status = 404;
      return next(err);
    }
    movies.deleteMovie(id);
    return movies.updateIds(); //pensar en sumar una respuesta con un mensaje
  });

module.exports = router;
