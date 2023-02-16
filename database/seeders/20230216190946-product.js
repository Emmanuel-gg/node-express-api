'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
const today = new Date().toISOString()

const products = [...Array(1000)].map(() => {
  const createdAt = faker.date.between('2001-01-01T00:00:00.000Z', today)
  const updatedAt = faker.date.between(createdAt, today)
  return ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stockQuantity: faker.datatype.number({
      min: 0,
      max: 5000000
    }),
    createdAt,
    updatedAt
  })
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product', products, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product', null, {})
  }
}
