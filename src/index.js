require('dotenv').config()

// Initialize express
const express = require('express')
const app = express()

// Middleware that come before routes
const cors = require('cors')

// Routes
const BuyerRouter = require('./router/Buyer/')
const ProductRouter = require('./router/Product/')

// Middleware that come after routes
const handleNotFound = require('./middleware/handleNotFound.js')
const handleErrors = require('./middleware/handleErrors.js')

app.use(cors())
app.use(express.json())

// Assign routes
app.use('/api/buyer', BuyerRouter)
app.use('/api/product', ProductRouter)

app.use(handleNotFound)

app.use(handleErrors)

const PORT = process.env[`${process.env.ENVIORMENT}_PORT`] || 3000
console.log(`${process.env.ENVIORMENT}_PORT`)
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
