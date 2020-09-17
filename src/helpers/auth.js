const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../helpers/env')
const { errToken } = require("../helpers/response")

const auth = {
  authentification: (req, res, next) => {
    const token = req.headers.token
    if (token === undefined || token === '') {
      errToken(res, [], "Token not found!");
    } else {
      next()
    }
  },
  authorization: (req, res, next) => {
    const token = req.headers.token
    jwt.verify(token, PRIVATEKEY, (err, decoded) => {
      if (err && err.name === 'JsonWebTokenError') {
        errToken(res, [], "Authentification failed !");
      } else if (err && err.name === 'TokenExpiredError') {
        errToken(res, [], "Token Expired !");
      }
      else {
        // console.log(decoded);
        next()
      }
    })
  }
}

module.exports = auth