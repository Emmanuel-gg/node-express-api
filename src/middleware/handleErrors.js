const ERROR_HANDLERS = {

  SequelizeValidationError: (res, error) => {
    const errors = error.errors.map(e => e.message)
    res.status(400).send({
      error: true,
      message: 'One or more fields are invalid',
      errors
    })
  },

  SequelizeUniqueConstraintError: (res, error) => {
    const errors = error.errors.map(e => e.message)
    res.status(400).send({
      error: true,
      message: 'One or more fields are invalid',
      errors
    })
  },

  defaultError: (res, error) => {
    console.error(error.name)
    res.status(500).send({
      error: true,
      message: 'Something went wrong'
    })
  }
}

module.exports = (error, _, response, next) => {
  console.log('error.name', error.name)
  console.log('error', error)
  const handler =
      ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}
