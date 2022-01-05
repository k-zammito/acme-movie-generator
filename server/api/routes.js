const router = require('express').Router();
const {
  models: { Movie },
} = require('../Movie');

// GET /api/movies
router.get('/movies', async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      order: [
        ['rating', 'DESC'],
        ['name', 'ASC'],
      ],
    });
    res.send(movies);
  } catch (error) {
    next(error);
  }
});

// GET /api/movies/:id
router.get('/movies/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.send(movie);
  } catch (error) {
    next(error);
  }
});

// POST /api/movies --> CREATE MOVIE
router.post('/movies', async (req, res, next) => {
  try {
    res.status(201).send(await Movie.create({ name: Movie.createMovie() }));
  } catch (error) {
    next(error);
  }
});

// PUT /api/movies/:id --> UPDATE EXISTING MOVIE
router.put('/movies/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.send(await movie.update({ rating: req.body.rating }));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/movies/:id
router.delete('/movies/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
