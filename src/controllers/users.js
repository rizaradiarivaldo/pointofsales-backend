const usersModel = require("../models/users");
const { success, failed, successWithMeta } = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { PRIVATEKEY, REFRESHTOKEN } = require('../helpers/env')
const nodemailer = require('nodemailer')
const env = require('../helpers/env')

const users = {
  register: (req, res) => {
    const email = req.body.email
    const pw = req.body.password
    const newEmail = email.toLowerCase()
    const data = {
      email: newEmail,
      password: bcrypt.hashSync(pw, 10),
    };
    jwt.sign(
      { email: data.email }, 'radia', { expiresIn: '1h' }, (err, response) => {
        if (err) {
          res.send('gagal');
        } else {
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
              user: env.EMAIL, // generated ethereal user
              pass: env.PASSWORD_EMAIL, // generated ethereal password
            },
          })

          let emailRegister = `<div>
          <p>Follow link for activation</p>
          <a href="${env.PORT_AWS}/users/active/${response}"> GO </a>
          </div>`

          transporter.sendMail({
            // from: '"Fred Foo 👻" <foo@example.com>"', // sender address
            from: env.EMAIL,
            to: data.email, // list of receivers
            subject: "Hello ✔", // Subject line
            // text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
            html: emailRegister, // html body
          });
        }
      }
    )
    usersModel
      .register(data)
      .then((result) => {
        success(res, result, "Check your email, please verification");
        // console.log(result)
      })
      .catch((err) => {
        if (err) {
          if (err.message === "Error: Duplicate entry 'rizaradiarivaldo@gmail.com' for key 'email'") {
            failed(res, [], 'email already exist');
          } else {
            failed(res, [], err.message);
          }
        }
      });
  },
  active: (req, res) => {
    const token = req.params.token
    if (token) {
      jwt.verify(token, 'radia', (err, decode) => {
        // console.log(decode)
        if (err) {
          failed(res, [], 'Failed authorization!')
        } else {
          const email = decode.email
          usersModel.activation(email)
            .then(() => {
              success(res, { email: email }, 'Email has been activated')
            }).catch((err) => {
              failed(res, [], err.message)
            });
        }
      })
    }

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
        if (result.length < 1) {
          failed(res, [], 'Email not registered, Register please!')
        } else {
          const results = result[0]
          const id = results.id
            const password = results.password
            //compareSync(data from request , data from database)
            const isMatch = bcrypt.compareSync(data.password, password)
            if (isMatch) {
              if (results.is_active === 1) {
                const userData = {
                  email: results.email,
                  level: results.level
                }
                const refreshToken = jwt.sign(userData, REFRESHTOKEN)
                const token = newToken(userData)

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
                failed(res, [], 'Activation needed!')
              }
            } else {
              failed(res, [], 'Password wrong, check again!')
            }
        }
        // const results = result[0]
        // const id = results.id
        // if (!results) {
        //   failed(res, [], 'Email not registered, Please register!')
        // } else {
        //   const password = results.password
        //   //compareSync(data from request , data from database)
        //   const isMatch = bcrypt.compareSync(data.password, password)
        //   if (isMatch) {
        //     if (results.is_active === 1) {
        //       const userData = {
        //         email: results.email,
        //         level: results.level
        //       }
        //       const refreshToken = jwt.sign(userData, REFRESHTOKEN)
        //       const token = newToken(userData)

        //       if (results.refreshtoken === null) {
        //         usersModel.renewToken(refreshToken, id)
        //           .then((response) => {
        //             console.log(response)
        //             const data = {
        //               token,
        //               refreshtoken: refreshToken
        //             }
        //             success(res, data, 'Token refresh success')
        //           }).catch((err) => {
        //             failed(res, [], err)
        //           });
        //       } else {
        //         const data = {
        //           token,
        //           refreshtoken: results.refreshtoken
        //         }
        //         success(res, data, 'Token success')
        //       }
        //     } else {
        //       failed(res, [], 'Activation needed!')
        //     }
        //   } else {
        //     failed(res, [], 'Email or Password wrong, check again!')
        //   }
        // }
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
        const newtoken = newToken({ email: result.email, level: result.level })
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

  logout: (req, res) => {
    try {
      const id = req.params.id
      usersModel.logout(id)
        .then((result) => {
          success(res, result, 'Logout Success')
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (err) {
      failed(res, [], 'Error Internal Server')
    }
  }
}

const newToken = (userData) => {
  return jwt.sign(userData, PRIVATEKEY, { expiresIn: '1h' })
}

module.exports = users;
