'use strict'
const {
  Model,
  DATE
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BuyerEvent extends Model {
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
  BuyerEvent.init({
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.ENUM('purchase', 'return', 'visit', 'data_query', 'data_update', 'invoice_download'),
      allowNull: false,
      validate: {
        isIn: [['purchase', 'return', 'visit', 'data_query', 'data_update', 'invoice_download']]
      }
    },
    buyerTransactionId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DATE(3)
    }
  }, {
    sequelize,
    modelName: 'BuyerEvent'
  })
  return BuyerEvent
}
