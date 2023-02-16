'use strict'
const {
  Model,
  literal,
  DATE
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    created_at: {
      type: DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3)')
    },
    updated_at: {
      type: DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
    }
  }, {
    sequelize,
    modelName: 'Product'
  })
  return Product
}
