require('dotenv').config()

// Initialize express
const express = require('express')
const app = express()

// Middleware that come before routes
const cors = require('cors')

// Middleware that come after routes
const handleNotFound = require('./middleware/handleNotFound.js')
const handleErrors = require('./middleware/handleErrors.js')

app.use(cors())
app.use(express.json())

app.use(handleNotFound)

app.use(handleErrors)

const PORT = process.env[`${process.env.ENVIORMENT}_PORT`] || 3000
console.log(`${process.env.ENVIORMENT}_PORT`)
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
