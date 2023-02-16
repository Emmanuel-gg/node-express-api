'use strict'
const {
  Model,
  DATE,
  literal
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BuyerTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Buyer, {
        foreignKey: 'buyerId',
        as: 'buyer'
      })
    }
  }
  BuyerTransaction.init({
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tax: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    createdAt: {
      type: DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3)')
    },
    updatedAt: {
      type: DATE(3),
      defaultValue: literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
    }
  }, {
    sequelize,
    modelName: 'BuyerTransaction'
  })
  BuyerTransaction.associate = function (models) {
    BuyerTransaction.belongsTo(models.Buyer, {
      foreignKey: 'buyerId',
      as: 'buyer'
    })
  }
  return BuyerTransaction
}
