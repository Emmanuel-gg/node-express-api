process.env.ENVIORMENT = 'TESTING'

const { sequelize } = require('../../../../database/models')
const { getReport } = require('../../../../src/controller/Buyer/BuyerTransaction')

const helper = require('../../../../src/helper/')

describe('BuyerTransaction - Controller - getReport', () => {
  test('should get report', async () => {
    const report = await getReport({
      from: helper.getDateFromNowByMonths(-1),
      condition: 'gt:40',
      type: 'sum',
      field: 'total',
      include: ['buyer.id:name:lastName'],
      group: 'buyer.id'
    })
    expect(report).toBeInstanceOf(Array)

    const [expectedReport] = await sequelize.query("SELECT sum(`total`) AS `sumTotal`, `buyer`.`id` AS `buyer.id`, `buyer`.`name` AS `buyer.name`, `buyer`.`lastName` AS `buyer.lastName` FROM `BuyerTransaction` AS `BuyerTransaction` LEFT OUTER JOIN `Buyer` AS `buyer` ON `BuyerTransaction`.`buyerId` = `buyer`.`id` WHERE `BuyerTransaction`.`createdAt` > '2023-01-17 23:32:56.961' AND (SELECT SUM(`total`) FROM  `BuyerTransaction` AS  `BuyerTransaction2` WHERE `BuyerTransaction2`.id = `BuyerTransaction`.id) > 40 GROUP BY `buyer`.`id`")
    expect(report).toHaveLength(expectedReport.length)
  })
})
