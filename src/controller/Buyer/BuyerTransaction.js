const { Op } = require('sequelize')
const bd = require('../../../database/models/index.js')
const { BuyerTransaction, sequelize } = bd

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
    const where = {}
    const condition = report.condition?.split(':')
    const aliases = {
      buyerEvent: 'event'
    }
    const symbols = {
      gt: '>',
      lt: '<',
      gte: '>=',
      lte: '<=',
      eq: '='
    }
    if (report.from) {
      where.createdAt = {
        [Op.gte]: report.from
      }
    }
    if (report.type === 'sum') {
      // NOTE: Has to be a way to do this with sequelize
      // PROBLEM: can have a problem of SQL injection
      where[report.field] = sequelize.literal(`(SELECT SUM(\`${report.field}\`) FROM  \`BuyerTransaction\` AS  \`BuyerTransaction2\` WHERE \`BuyerTransaction2\`.id = \`BuyerTransaction\`.id) ${symbols[condition[0]]} ${condition[1]}`)
      attributes.push([sequelize.fn('sum', sequelize.col(report.field)), 'sumTotal'])
    } else if (condition) {
      where[report.field] = {
        [Op[condition[0]]]: condition[1]
      }
    }

    if (report.include) {
      findAllOptions.include = report.include.map(includeRaw => {
        const [include, ...includeOfinclude] = includeRaw.split(';')
        const includeSplit = include.split('.')

        const includeOptions = {}
        includeOptions.model = bd[includeSplit[0].charAt(0).toUpperCase() + includeSplit[0].slice(1)]
        includeOptions.as = aliases[includeSplit[0]] || includeSplit[0]
        if (includeOfinclude?.length) {
          includeOptions.include = includeOfinclude.map(includeOfincludeRaw => {
            const includeOfincludeSplit = includeOfincludeRaw.split('.')
            const includeOfincludeOptions = {}
            includeOfincludeOptions.model = bd[includeOfincludeSplit[0].charAt(0).toUpperCase() + includeOfincludeSplit[0].slice(1)]
            includeOfincludeOptions.as = aliases[includeOfincludeSplit[0]] || includeOfincludeSplit[0]
            if (includeOfincludeSplit.length > 1 && includeOfincludeSplit[1].length) {
              includeOfincludeOptions.attributes = includeOfincludeSplit[1].split(':')
            }
            return includeOfincludeOptions
          })
        }

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
