
const supertest = require('supertest')
const { server } = require('../../../src/index')
const api = supertest(server)
const { BuyerEvent } = require('../../../database/models/index.js')
describe('BuyerEvent - Integrations tests', () => {
  beforeAll(async () => {
    // server = await require('../../index.js')({ initDb: true })
    // server = await require('../../index.js')()
  })
  test('should create a buyer event', async () => {
    const buyerId = 1
    const buyerEventToCreate = {
      name: 'data_update'
    }
    const expectedBuyerEvent = {
      ...buyerEventToCreate,
      buyerId
    }

    const response = await api
      .post(`/api/buyer/${buyerId}/event`)
      .send(buyerEventToCreate)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('id')

    const { id } = response.body
    const buyerEvent = await BuyerEvent.findByPk(id)
    expect(buyerEvent).not.toBeNull()
    expect(buyerEvent.dataValues).toMatchObject(expectedBuyerEvent)
  })

  const tests = [
    {
      name: 'should not create a buyer event without total and buyerId',
      body: {},
      buyerId: 1,
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'BuyerEvent.name cannot be null'
        ]
      }
    },
    {
      name: 'should not create a buyer event with wrong name',
      buyerId: 1,
      body: {
        name: 'ThisIsAWrongName'
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Validation isIn on name failed'
        ]
      }
    },
    {
      name: 'should not create a buyer event with wrong buyerId',
      buyerId: 'ThisIsAWrongBuyerId',
      body: {
        name: 'data_update'
      },
      expectedStatus: 404,
      expectedResponse: {
        error: 'Buyer not found'
      }
    }
  ]

  tests.forEach(async ({ name, body, buyerId, expectedStatus, expectedResponse }) => {
    test(name, async () => {
      const response = await api
        .post(`/api/buyer/${buyerId}/event`)
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
