module.exports = (request, response, next) => {
  response.status(404).send({
    error: true,
    message: 'Route not found'
  })
}
