const BuyerTransactionRouter = require('express').Router()

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
  return BuyerTransactionController.getReport(report)
    .then(report => {
      response.status(200).send(report)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = BuyerTransactionRouter
