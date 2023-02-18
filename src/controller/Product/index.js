const { Op } = require('sequelize')
const { Product } = require('../../../database/models/index.js')
const ProductController = {
  save: async (name, description, price, stockQuantity) => {
    const product = new Product({
      name,
      description,
      price,
      stockQuantity
    })

    return product.save().then(({ id }) => ({ id }))
  },
  delete: async (id) => {
    return Product.destroy({
      where: {
        id
      }
    })
  },
  getById: async (id) => {
    return Product.findByPk(id)
  },
  getAll: async (options) => {
    const { query: { price, stockQuantity } } = options
    const where = {}
    if (price) {
      where.price = {
        [Op[price.operator || 'eq']]: price.value
      }
    }

    if (stockQuantity) {
      where.stockQuantity = {
        [Op[stockQuantity.operator || 'eq']]: stockQuantity.value
      }
    }

    return Product.findAll({
      where
    })
  }
}
module.exports = ProductController
