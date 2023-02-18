const getDateFromNowByMonths = (months) => {
  const date = new Date()
  date.setMonth(date.getMonth() + months)
  return date
}

module.exports = {
  getDateFromNowByMonths
}
