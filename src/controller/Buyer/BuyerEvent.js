const { Op } = require('sequelize')
const { BuyerEvent } = require('../../../database/models/index.js')
const BuyerEventController = {
  save: async (name, buyerId) => {
    const buyerEvent = new BuyerEvent({
      name,
      buyerId
    })

    return buyerEvent.save().then(({ id }) => ({ id }))
  },
  savePurchase: async (buyerId) => {
    const buyerEvent = new BuyerEvent({
      name: 'purchase',
      buyerId
    })

    return buyerEvent.save().then(({ id }) => ({ id }))
  },
  getAll: async (options) => {
    const { query: { buyerTransactionId } } = options
    const where = {}
    if (buyerTransactionId) {
      where.buyerTransactionId = Array.isArray(buyerTransactionId)
        ? buyerTransactionId
        : {
            [Op[buyerTransactionId.operator || 'eq']]: buyerTransactionId.value
          }
    }

    return BuyerEvent.findAll({
      where
    })
  },
  getAllByBuyerTransaction: async (including) => {
    return BuyerEventController.getAll({
      query: {
        buyerTransactionId: {
          operator: including ? 'not' : 'eq',
          value: null
        }
      }
    })
  },
  getAllWithBuyerTransaction: async () => {
    return BuyerEventController.getAllByBuyerTransaction(true)
  }
}
module.exports = BuyerEventController
