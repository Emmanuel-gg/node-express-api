const BuyerTransactionController = require('../../controller/Buyer/BuyerTransaction')
const BuyerEventController = require('../../controller/Buyer/BuyerEvent')

const BuyerTransactionRouter = require('express').Router()
BuyerTransactionRouter.post('/', async (request, response, next) => {
  const buyer = request.buyer
  const { body } = request
  const { total, tax } = body

  BuyerTransactionController.save(total, tax, buyer.id)
    .then(objectResponse => {
      BuyerEventController.savePurchase(buyer.id)
        .then(event => {
          objectResponse.eventId = event.id
        })
        .catch(error => {
          next(error)
        })
        .finally(() => {
          response.status(201).send(objectResponse)
        })
    })
    .catch(error => {
      next(error)
    })
})

module.exports = BuyerTransactionRouter
