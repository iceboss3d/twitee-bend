
export const response = {
  successWithData(res, message, data, statusCode = 200) {
    return res.status(statusCode).send({
      status: true,
      message,
      data
    })
  },
  success(res, message, statusCode = 200) {
    return res.status(statusCode).send({
      status: true,
      message
    })
  },
  notFound(res, message) {
    return res.status(404).send({
      status: false,
      message
    })
  },
  error(res, message, statusCode = 500) {
    return res.status(statusCode).send({
      status: false,
      error: message
    })
  },
  validationError(res, errors) {
    return res.status(400).send({
      status: false,
      error: errors[0].message
    })
  }
}