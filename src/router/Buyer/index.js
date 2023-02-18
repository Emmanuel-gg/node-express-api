const BuyerRouter = require('express').Router()
const BuyerController = require('../../controller/Buyer/')
const BuyerEventRouter = require('./BuyerEvent.js')
const BuyerTransactionRouter = require('./BuyerTransaction.js')

BuyerRouter.use('/:id', function (req, res, next) {
  BuyerController.getById(req.params.id)
    .then(buyer => {
      if (buyer) {
        req.buyer = buyer
        next()
      } else {
        res.status(404).send({ error: 'Buyer not found' })
      }
    })
    .catch(error => next(error))
})

BuyerRouter.use('/:id/transaction', BuyerTransactionRouter)

BuyerRouter.use('/:id/event', BuyerEventRouter)

BuyerRouter.post('/', (request, response, next) => {
  const { body } = request
  const { name, lastName, idType, document } = body

  BuyerController.save(name, lastName, idType, document)
    .then(objectResponse => {
      response.status(201).send(objectResponse)
    })
    .catch(error => {
      next(error)
    })
})

BuyerRouter.get('/', (request, response, next) => {
  const { page, perPage } = request.query
  BuyerController.getAll({ query: { page: parseInt(page), perPage: parseInt(perPage) } })
    .then(objectResponse => {
      response.status(200).send(objectResponse)
    })
    .catch(error => {
      next(error)
    })
})

BuyerRouter.get('/:id', (request, response, next) => {
  BuyerController.getTransactionsAndEvents(request.buyer.id)
    .then((objectResponse) => {
      response.status(200).send(objectResponse)
    })
    .catch(error => {
      next(error)
    })
    
})

module.exports = BuyerRouter
