const BuyerEventController = require('../../controller/Buyer/BuyerEvent')

const BuyerEventRouter = require('express').Router()
BuyerEventRouter.post('/', async (request, response, next) => {
  const buyer = request.buyer
  const { body } = request
  const { name } = body

  BuyerEventController.save(name, buyer.id)
    .then(objectResponse => {
      response.status(201).send(objectResponse)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = BuyerEventRouter
