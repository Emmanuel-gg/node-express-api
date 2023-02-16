'use strict'
const {
  Model,
  DATE,
  literal
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.hasMany(models.BuyerTransaction, {
        foreignKey: 'buyerId',
        as: 'transaction'
      })
      this.hasMany(models.BuyerEvent, {
        foreignKey: 'buyerId',
        as: 'event'
      })
    }
  }
  Buyer.init({
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    idType: {
      type: DataTypes.ENUM('TIPO1', 'TIPO2', 'TIPO3', 'TIPO4'),
      allowNull: false
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
    modelName: 'Buyer'
  })
  return Buyer
}
