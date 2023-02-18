'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BuyerEvent', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Buyer',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      buyerTransactionId: {
        type: Sequelize.INTEGER
        /* references: {
          model: 'BuyerTransaction',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' */
      },
      name: {
        type: Sequelize.ENUM('purchase', 'return', 'visit', 'data_query', 'data_update', 'invoice_download'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      // PROBLEM: Sequelize its sending updatedAt to the database
      updatedAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BuyerEvent')
  }
}
