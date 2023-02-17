'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
const today = new Date().toISOString()

const buyers = [...Array(1000)].map(() => {
  const createdAt = faker.date.between('2001-01-01T00:00:00.000Z', today)
  const updatedAt = faker.date.between(createdAt, today)
  return ({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    idType: ['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4'][faker.datatype.number({
      min: 0,
      max: 3
    })],
    createdAt,
    updatedAt
  })
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Buyer', buyers, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Buyer', null, {})
  }
}
