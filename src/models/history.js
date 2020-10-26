const db = require("../configs/db");

const history = {
  getAll: (sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT *, (SELECT COUNT(*) FROM history ) as count FROM history ORDER BY ${sort} ${typesort} LIMIT ${limit} OFFSET ${offset}`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM history WHERE id_history='${id}'`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  insertMaster: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO history (invoices,cashier,amount) VALUES ('${data.invoices}','${data.cashier}','${data.amount}')`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  insertDetail: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO detail_history (id_history,id_product,productname,qty,price) VALUES ('${id}','${data.id_product}','${data.productname}','${data.qty}','${data.price}')`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },



  update: (data, id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE history SET invoices='${data.invoices}',cashier='${data.cashier}', amount='${data.amount}' WHERE id_history='${id}'`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  updatePatch: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE history SET ? WHERE id_history = ?`,
        [data, id],
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM history WHERE id_history='${id}'`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = history;
