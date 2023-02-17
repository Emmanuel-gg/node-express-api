const transformRequestQueryForFilter = (requestQuery, { searchebleFields }) => {
  const query = {}
  for (const key in requestQuery) {
    if (Object.hasOwnProperty.call(requestQuery, key)) {
      if (searchebleFields.includes(key.split('.')[0])) {
        const name = key.split('.')[0]
        const operator = key.split('.')[1]
        query[name] = {
          operator,
          value: requestQuery[key]
        }
      }
    }
  }
  return query
}
module.exports = {
  transformRequestQueryForFilter
}
