const usersModel = require("../models/users");
const { success, failed, successWithMeta } = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { PRIVATEKEY, REFRESHTOKEN } = require('../helpers/env')

const users = {
  register: (req, res) => {
    const email = req.body.email
    const newEmail = email.toLowerCase()
    const data = {
      email: newEmail,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    usersModel
      .register(data)
      .then((result) => {
        success(res, result, "Register success");
      })
      .catch((err) => {
        failed(res, [], "Register Failed");
      });
  },

  login: (req, res) => {
    const email = req.body.email
    const newEmail = email.toLowerCase()
    const data = {
      email: newEmail,
      password: req.body.password,
    };
    usersModel
      .login(data)
      .then((result) => {
        const results = result[0]
        const id = results.id
        if (!results) {
          failed(res, [], 'Email not registered, Please register!')
        } else {
          const password = results.password
          //compareSync(data from request , data from database)
          const isMatch = bcrypt.compareSync(data.password, password)
          if (isMatch) {

            const email = {
              email: results.email
            }
            const refreshToken = jwt.sign(email, REFRESHTOKEN)
            const token = newToken(email)

            if (results.refreshtoken === null) {
              usersModel.renewToken(refreshToken, id)
                .then((response) => {
                  console.log(response)
                  const data = {
                    token,
                    refreshtoken: refreshToken
                  }
                  success(res, data, 'Token refresh success')
                }).catch((err) => {
                  failed(res, [], err)
                });
            } else {
              const data = {
                token,
                refreshtoken: results.refreshtoken
              }
              success(res, data, 'Token success')
            }
          } else {
            failed(res, [], 'Email or Password wrong, check again!')
          }
        }
      })
      .catch((err) => {
        failed(res, [], err.message)
      });
  },

  tokenrefresh: (req, res) => {
    const tokenReq = req.body.tokenReq
    if (!tokenReq) {
      failed(res, [], 'Token must have a value!')
    } else {
      jwt.verify(tokenReq, REFRESHTOKEN, (err, result) => {
        const newtoken = newToken({ email: result.email })
        res.json({ newtoken: newtoken })
        // console.log(newtoken)
      })
    }
  },

  update: (req, res) => {
    const id = req.params.id
    const body = req.body
    usersModel.update(id, body)
      .then((result) => {
        success(res, result, `Id: ${id} updated!`)
      }).catch((err) => {
        failed(res, [], 'Update Failed!')
      });
  },
  delete: (req, res) => {
    const id = req.params.id
    usersModel.delete(id)
      .then((result) => {
        success(res, result, `Id: ${id} Deleted!`)
      }).catch((err) => {
        failed(res, [], 'Delete Failed!')
      });
  },
}

const newToken = (email) => {
  return jwt.sign(email, PRIVATEKEY, { expiresIn: '1h' })
}

module.exports = users;
