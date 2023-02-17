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
  getAll: async () => {
    return Product.findAll()
  }
}
module.exports = ProductController
