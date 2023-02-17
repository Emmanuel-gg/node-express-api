
const supertest = require('supertest')
const { server } = require('../../../src/index')
const api = supertest(server)
const { Product } = require('../../../database/models/index.js')

let productId = null
describe('Product - Integrations tests', () => {
  beforeAll(async () => {
    // await require('../../index.js')()
  })
  test('should create a product', async () => {
    const expectedProduct = {
      name: 'ANameForAProduct',
      description: 'ThisIsADescription',
      price: 100,
      stockQuantity: 10
    }
    const response = await api
      .post('/api/product')
      .send(expectedProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('id')

    const { id } = response.body
    productId = id
    const product = await Product.findByPk(id)
    expect(product).not.toBeNull()

    expect(product.dataValues).toMatchObject(expectedProduct)
  })

  test('should get all products', async () => {
    const response = await api
      .get('/api/product')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toBeInstanceOf(Array)

    const products = await Product.findAll()
    expect(response.body).toHaveLength(products.length)
  })
  test('should delete a product', async () => {
    const response = await api
      .delete(`/api/product/${productId}`)
      .expect(204)
    expect(response.body).toMatchObject({})

    const product = await Product.findByPk(productId)
    expect(product).toBeNull()
  })
  const tests = [
    {
      name: 'should not create a product with null name and price',
      body: {
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Product.name cannot be null',
          'Product.price cannot be null'
        ]
      }
    },
    {
      name: 'should not create a product with a empty name',
      body: {
        name: '',
        price: 100
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Validation notEmpty on name failed'
        ]
      }
    },
    {
      name: 'should not create a product with wrong price and stockQuantity',
      body: {
        name: 'ANameForAProduct',
        price: 'ThisIsAWrongPrice',
        stockQuantity: 'ThisIsAWrongStockQuantity'
      },
      expectedStatus: 400,
      expectedResponse: {
        error: true,
        message: 'One or more fields are invalid',
        errors: [
          'Validation isNumeric on price failed',
          'Validation isNumeric on stockQuantity failed'
        ]
      }
    }
  ]
  tests.forEach(async ({ name, body, expectedStatus, expectedResponse }) => {
    test(name, async () => {
      const response = await api
        .post('/api/product/')
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
