'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Buyer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      document: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      lastName: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      idType: {
        type: Sequelize.ENUM('TYPE1', 'TYPE2', 'TYPE3', 'TYPE4'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      updatedAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Buyer')
  }
}
