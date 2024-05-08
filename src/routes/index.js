const { Router } = require('express')

const usersRoutes = require('./users.routes')
const moviesRoutes = require('./movie_notes.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/notes', moviesRoutes)

module.exports = routes