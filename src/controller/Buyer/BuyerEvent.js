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
  }
}
module.exports = BuyerEventController
