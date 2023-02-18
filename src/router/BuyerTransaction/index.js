const BuyerTransactionRouter = require('express').Router()

const BuyerEventController = require('../../controller/Buyer/BuyerEvent')
const BuyerTransactionController = require('../../controller/Buyer/BuyerTransaction')
const helper = require('../../helper/')

BuyerTransactionRouter.get('/', (request, response, next) => {
  let report = null
  if (!request.query.report) {
    return response.status(400).send({ error: 'Report is required' })
  }
  if (request.query.report === 'last-month-sum-total-greather-than-40') {
    report = {
      from: helper.getDateFromNowByMonths(-1),
      condition: 'gt:40',
      type: 'sum',
      field: 'total',
      include: ['buyer'],
      group: 'buyer.id'
    }
  }
  if (request.query.report === 'transactions-event-from-buyers') {
    report = {
      from: request.query.from,
      attributes: ['id'],
      // include: ['buyer.id:name:lastName:document', 'buyerEvent.id']
      include: ['buyer.id:name:lastName:document']
    }
  }
  return BuyerTransactionController.getReport(report)
    .then(buyerTransactionReport => {
      if (request.query.report === 'transactions-event-from-buyers') {
        BuyerEventController.getAllWithBuyerTransaction()
          .then(eventsResult => {
            const transactionWithEvent = eventsResult.map(event => event.buyerTransactionId)
            console.log({ transactionWithEvent })

            const transactionId = buyerTransactionReport.map(transaction => transaction.id)
            console.log({ transactionId })

            buyerTransactionReport.map((transaction, index) => {
              const eventResult = eventsResult.find(event => {
                return event.buyerTransactionId === transaction.id
              })
              if (eventResult) {
                transaction.dataValues.event = eventResult
              }

              return transaction
            })
            response.status(200).send(buyerTransactionReport)
          })
          .catch(error => {
            next(error)
          })
      } else {
        response.status(200).send(buyerTransactionReport)
      }
    })
    .catch(error => {
      next(error)
    })
})

module.exports = BuyerTransactionRouter
