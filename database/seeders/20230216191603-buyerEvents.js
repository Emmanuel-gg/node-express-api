'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
const today = new Date().toISOString()

const buyerEvents = [...Array(4000)].map(() => {
  const createdAt = faker.date.between('2001-01-01T00:00:00.000Z', today)
  return ({
    buyerId: faker.datatype.number({
      min: 1,
      max: 1000
    }),
    name: ['purchase', 'return', 'visit', 'data_query', 'data_update', 'invoice_download'][faker.datatype.number({
      min: 0,
      max: 5
    })],
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
