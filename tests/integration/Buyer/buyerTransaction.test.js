
const supertest = require('supertest')
const { server } = require('../../../src/index')
const api = supertest(server)
const { BuyerTransaction } = require('../../../database/models/index.js')

describe('BuyerTransaction - Integrations tests', () => {
  beforeAll(async () => {
    // server = await require('../../index.js')({ initDb: true })
    // server = await require('../../index.js')()
  })
  test('should create a buyer transaction', async () => {
    const buyerId = 1
    const buyerTransactionToCreate = {
      total: 100,
      tax: 10
    }
    const expectedTransaction = {
      ...buyerTransactionToCreate,
      buyerId
    }

    const response = await api
      .post(`/api/buyer/${buyerId}/transaction`)
      .send(buyerTransactionToCreate)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('id')

    const { id } = response.body
    const buyerTransaction = await BuyerTransaction.findByPk(id)
    expect(buyerTransaction).not.toBeNull()
    expect(buyerTransaction.dataValues).toMatchObject(expectedTransaction)
  })
  const buyerId = 1
  const tests = [
    {
      name: 'should not create a buyer transaction without total',
      body: {},
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'BuyerTransaction.total cannot be null'
        ]
      }
    },
    {
      name: 'should not create a buyer transaction with wrong total and tax',
      body: {
        total: 'ThisIsAWrongTotal',
        tax: 'ThisIsAWrongTax'
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Validation isNumeric on total failed',
          'Validation isNumeric on tax failed'
        ]
      }
    }
  ]

  tests.forEach(async ({ name, body, expectedStatus, expectedResponse }) => {
    test(name, async () => {
      const response = await api
        .post(`/api/buyer/${buyerId}/transaction`)
        .send(body)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
      expect(response.body).toMatchObject(expectedResponse)
    })
  })
  afterAll(async () => {
    await server.close()
  })
})
