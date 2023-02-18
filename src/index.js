const envArgs = process.argv.find(arg => arg.includes('--enviorment='))?.split('=')[1]
const enviorments = {
  dev: 'DEVELOPMENT',
  test: 'TESTING',
  prod: 'PRODUCTION'
}
const env = enviorments[envArgs] || process.env.ENVIORMENT || 'DEVELOPMENT'
process.env.ENVIORMENT = env

require('dotenv').config()

// Initialize express
const express = require('express')
const app = express()

// Middleware that come before routes
const cors = require('cors')

// Routes
const BuyerRouter = require('./router/Buyer/')
const ProductRouter = require('./router/Product/')
const BuyerTransactionRouter = require('./router/BuyerTransaction/')

// Middleware that come after routes
const handleNotFound = require('./middleware/handleNotFound.js')
const handleErrors = require('./middleware/handleErrors.js')

app.use(cors())
app.use(express.json())

// Assign routes
app.use('/api/buyer', BuyerRouter)
app.use('/api/product', ProductRouter)
app.use('/api/transaction', BuyerTransactionRouter)

app.use(handleNotFound)

app.use(handleErrors)

const PORT = process.env[`${env}_PORT`] || 3000
console.log(`${env}_PORT`)
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
