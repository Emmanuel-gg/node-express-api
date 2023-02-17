
const supertest = require('supertest')
const { server } = require('../../../src/index')
const api = supertest(server)
const { Buyer } = require('../../../database/models/index.js')
describe('Buyer - Integrations tests', () => {
  beforeAll(async () => {
    // await require('../../index.js')()
  })
  test('should create a buyer', async () => {
    const expectedBuyer = {
      name: 'ANameForABuyer',
      lastName: 'ThisIsALastName',
      idType: 'TYPE1'
    }
    const response = await api
      .post('/api/buyer')
      .send(expectedBuyer)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('id')

    const { id } = response.body
    const buyer = await Buyer.findByPk(id)
    expect(buyer).not.toBeNull()

    expect(buyer.dataValues).toMatchObject(expectedBuyer)
  })
  const tests = [
    {
      name: 'should not create a buyer with null name, lastName and idType',
      body: {
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Buyer.name cannot be null',
          'Buyer.lastName cannot be null',
          'Buyer.idType cannot be null'
        ]
      }
    },
    {
      name: 'should not create a buyer with empty name, lastName and idType',
      body: {
        name: '',
        lastName: '',
        idType: ''
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Validation notEmpty on name failed',
          'Validation notEmpty on lastName failed',
          'Validation isIn on idType failed'
        ]
      }
    },
    {
      name: 'should not create a buyer with a wrong idType',
      body: {
        name: 'ANameForABuyer',
        lastName: 'ThisIsALastName',
        idType: 'ThisIsAWrongIdType'
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Validation isIn on idType failed'
        ]
      }
    }
  ]
  tests.forEach(async ({ name, body, expectedStatus, expectedResponse }) => {
    test(name, async () => {
      const response = await api
        .post('/api/buyer/')
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
