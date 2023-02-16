'use strict'
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
const today = new Date().toISOString()

const buyerTransactions = [...Array(4000)].map(() => {
  const createdAt = faker.date.between('2001-01-01T00:00:00.000Z', today)
  const updatedAt = faker.date.between(createdAt, today)
  return ({
    buyerId: faker.datatype.number({
      min: 1,
      max: 1000
    }),
    total: faker.commerce.price(),
    tax: faker.commerce.price(),
    createdAt,
    updatedAt
  })
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BuyerTransaction', buyerTransactions, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BuyerTransaction', null, {})
  }
}
