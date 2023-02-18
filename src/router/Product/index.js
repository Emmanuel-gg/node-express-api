const ProductRouter = require('express').Router()
const ProductController = require('../../controller/Product')
const { transformRequestQueryForFilter } = require('../utils')

ProductRouter.use('/:id', function (req, res, next) {
  ProductController.getById(req.params.id)
    .then(product => {
      if (product) {
        req.product = product
        next()
      } else {
        res.status(404).send({ error: 'Product not found' })
      }
    })
    .catch(error => next(error))
})

ProductRouter.post('/', (request, response, next) => {
  const { body } = request
  const { name, description, price, stockQuantity } = body

  ProductController.save(name, description, price, stockQuantity)
    .then(objectResponse => {
      response.status(201).send(objectResponse)
    })
    .catch(error => {
      next(error)
    })
})

ProductRouter.get('/:id?', (request, response, next) => {
  const { product } = request

  // Get extra parameters

  if (product) {
    response.status(200).send(product)
    return
  }
  const searchebleFields = ['price', 'stockQuantity']

  const query = transformRequestQueryForFilter(request.query, { searchebleFields })

  ProductController.getAll({ query })
    .then(products => {
      response.status(200).send(products)
    })
    .catch(error => {
      next(error)
    })
})

ProductRouter.delete('/:id', (request, response, next) => {
  const { product } = request

  ProductController.delete(product.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

module.exports = ProductRouter
