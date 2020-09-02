const db = require("../configs/db");
const e = require("express");

const history = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM history`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO history (cashier,date,orders,amount) VALUES ('${data.cashier}','${data.date}','${data.orders}','${data.amount}')`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE history SET cashier='${data.cashier}', date='${data.date}',orders='${data.orders}',amount='${data.amount}' WHERE invoices='${id}'`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM history WHERE invoices='${id}'`;
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
