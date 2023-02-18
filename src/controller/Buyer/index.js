const { Buyer, BuyerEvent, BuyerTransaction } = require('../../../database/models/index.js')
const BuyerController = {
  save: async (name, lastName, idType, document) => {
    const buyer = new Buyer({
      name,
      lastName,
      idType,
      document
    })

    return buyer.save().then(({ id }) => ({ id }))
  },
  getById: async (id) => {
    return Buyer.findByPk(id)
  },
  getAll: async (options) => {
    const { query: { page, perPage } } = options
    return Buyer.findAndCountAll({
      offset: ((page - 1) * perPage),
      limit: perPage
    })
  },
  getTransactionsAndEvents: async (id) => {
    return Buyer.findByPk(id, {
      include: [
        {
          model: BuyerEvent,
          as: 'event'
        },
        {
          model: BuyerTransaction,
          as: 'transaction'
        }
      ]
    })
  }

}
module.exports = BuyerController
