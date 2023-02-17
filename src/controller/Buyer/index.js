const { Buyer } = require('../../../database/models/index.js')
const BuyerController = {
  save: async (name, lastName, idType) => {
    const buyer = new Buyer({
      name,
      lastName,
      idType
    })

    return buyer.save().then(({ id }) => ({ id }))
  },
  getById: async (id) => {
    return Buyer.findByPk(id)
  }
}
module.exports = BuyerController
