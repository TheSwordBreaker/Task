const send = (res, data, msg = '') => {
  res.json({
    status: 1,
    msg: msg,
    data: data
  })
}

const error = (res, msg = '') => {
  res.json({
    status: 0,
    msg: msg
  })
}

const catchasync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      console.log(err)
      res.status(err.status || 500)
      if(err.message) error(res,err.message)
      else error(res, err.errors[0].message)
    })
  }
}

module.exports = {
  send,
  error,
  catchasync
}
