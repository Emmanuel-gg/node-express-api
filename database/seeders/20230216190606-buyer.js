'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
const today = new Date().toISOString()
const documentsUsed = []
const buyers = [...Array(1000)].map(() => {
  const createdAt = faker.date.between('2001-01-01T00:00:00.000Z', today)
  const updatedAt = faker.date.between(createdAt, today)
  let document = faker.datatype.number({
    min: 1000000,
    max: 9999999
  })
  while (documentsUsed.includes(document)) {
    document = faker.datatype.number({
      min: 1000000,
      max: 9999999
    })
  }
  return ({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    document: faker.datatype.number({
      min: 1000000,
      max: 9999999
    }),
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
