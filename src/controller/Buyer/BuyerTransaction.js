const { BuyerTransaction } = require('../../../database/models/index.js')
const BuyerTransactionController = {
  save: async (total, tax, buyerId) => {
    const buyerEvent = new BuyerTransaction({
      total,
      tax,
      buyerId
    })

    return buyerEvent.save().then(({ id }) => ({ id }))
  }
}
module.exports = BuyerTransactionController
