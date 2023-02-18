'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
const today = new Date().toISOString()

const transactionIdUsed = [null]
const buyerEvents = [...Array(4000)].map(() => {
  const createdAt = faker.date.between('2001-01-01T00:00:00.000Z', today)

  const name = ['purchase', 'return', 'visit', 'data_query', 'data_update', 'invoice_download'][faker.datatype.number({
    min: 0,
    max: 5
  })]
  let buyerTransactionId = null
  if (name === 'purchase') {
    while (transactionIdUsed.includes(buyerTransactionId)) {
      buyerTransactionId = faker.datatype.number({
        min: 1,
        max: 4000
      })
    }
  }

  return ({
    buyerId: faker.datatype.number({
      min: 1,
      max: 1000
    }),
    name,
    buyerTransactionId,
    createdAt
  })
}
)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BuyerEvent', buyerEvents, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BuyerEvent', null, {})
  }
}
