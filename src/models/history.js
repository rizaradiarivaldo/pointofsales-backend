const db = require("../configs/db");
const e = require("express");

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
         const query = `SELECT * FROM history WHERE id='${id}'`;
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
         const query = `INSERT INTO history (invoices,cashier,date,orders,amount) VALUES ('${data.invoices}','${data.cashier}','${data.date}','${data.orders}','${data.amount}')`;
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
         const query = `UPDATE history SET invoices='${data.invoices}',cashier='${data.cashier}', date='${data.date}',orders='${data.orders}',amount='${data.amount}' WHERE invoices='${id}'`;
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
            `UPDATE history SET ? WHERE id = ?`,
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
         const query = `DELETE FROM history WHERE id='${id}'`;
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
