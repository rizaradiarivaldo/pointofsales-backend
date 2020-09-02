const db = require("../configs/db");

const category = {
  getall: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM category'`;
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
      const query = `INSERT INTO category (category) VALUES ('${data.category}')`;
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
      const query = `UPDATE category SET category='${data.category}' WHERE id_category='${id}'`;
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
      const query = `DELETE FROM category WHERE id_category='${id}'`;
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

module.exports = category;
