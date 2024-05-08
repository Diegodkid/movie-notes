const { Router } = require('express')

const MoviesController = require('../controllers/Movie_notesController')

const usersRoutes = Router()

const moviesController = new MoviesController()

usersRoutes.post('/:user_id', moviesController.create)
usersRoutes.get('/:id', moviesController.show)
usersRoutes.delete('/:id', moviesController.delete)
usersRoutes.get('/:user_id', moviesController.index)

module.exports = usersRoutes