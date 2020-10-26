const db = require("../configs/db");

const users = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (email,password,level,is_active) VALUES ('${data.email}','${data.password}', 2,0)`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  getDetailUser: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * users WHERE email='${data.email}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  activation: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET is_active=1 WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },

  login: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email = ? `, data.email, (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET email='${data.email}', password='${data.password}' WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },


  logout: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET refreshtoken=null WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },

  renewToken: (token, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET refreshtoken='${token}' WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
};

module.exports = users;
