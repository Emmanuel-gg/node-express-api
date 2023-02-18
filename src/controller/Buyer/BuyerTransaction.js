const { Op } = require('sequelize')
const bd = require('../../../database/models/index.js')
const { BuyerTransaction, Buyer, sequelize } = bd

const BuyerTransactionController = {
  save: async (total, tax, buyerId) => {
    const buyerEvent = new BuyerTransaction({
      total,
      tax,
      buyerId
    })

    return buyerEvent.save().then(({ id }) => ({ id }))
  },
  getReport: async (report) => {
    const findAllOptions = { }
    const attributes = []
    const where = {
      createdAt: {
        [Op.gt]: report.from
      }
    }
    const condition = report.condition.split(':')
    const symbols = {
      gt: '>',
      lt: '<',
      gte: '>=',
      lte: '<=',
      eq: '='
    }
    if (report.type === 'sum') {
      // NOTE: Has to be a way to do this with sequelize
      // PROBLEM: can have a problem of SQL injection
      where[report.field] = sequelize.literal(`(SELECT SUM(\`${report.field}\`) FROM  \`BuyerTransaction\` AS  \`BuyerTransaction2\` WHERE \`BuyerTransaction2\`.id = \`BuyerTransaction\`.id) ${symbols[condition[0]]} ${condition[1]}`)
      attributes.push([sequelize.fn('sum', sequelize.col(report.field)), 'sumTotal'])
    } else {
      where[report.field] = {
        [Op[condition[0]]]: condition[1]
      }
    }

    if (report.include) {
      findAllOptions.include = report.include.map(include => {
        const includeSplit = include.split('.')

        const includeOptions = {}
        includeOptions.model = bd[includeSplit[0].charAt(0).toUpperCase() + includeSplit[0].slice(1)]
        includeOptions.as = includeSplit[0]
        if (includeSplit.length > 1 && includeSplit[1].length) {
          includeOptions.attributes = includeSplit[1].split(':')
        }

        return includeOptions
      })
    }
    if (report.group) {
      findAllOptions.group = report.group
    }

    findAllOptions.where = where
    if (attributes.length) {
      findAllOptions.attributes = attributes
    }
    return BuyerTransaction.findAll(
      findAllOptions
    )
  }
}
module.exports = BuyerTransactionController
