require('express-async-errors')
const migrationsRun = require('./database/migrations')
const AppError = require('./utils/AppError')

const express = require('express')
const routes = require('./routes')

migrationsRun()

const app = express()
app.use(express.json())

app.use(routes)

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))