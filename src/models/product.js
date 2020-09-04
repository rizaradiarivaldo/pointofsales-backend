const db = require("../configs/db");
const fs = require('fs')

const product = {
   getAll: (name, sort, typesort, limit, offset) => {
      return new Promise((resolve, reject) => {
         const query = `SELECT products.id_product,products.productname,products.image,products.price,category.category, (SELECT COUNT(*) FROM products) as count FROM products LEFT JOIN category on products.id_category=category.id_category WHERE productname LIKE '%${name}%' ORDER BY ${sort} ${typesort} LIMIT ${limit} OFFSET ${offset} `;
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
         const query = `SELECT * FROM products WHERE id_product='${id}'`;
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
         const query = `INSERT INTO products (productname, image, price, id_category) VALUES ('${data.productname}','${data.image}','${data.price}','${data.id_category}')`;
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
         db.query(`SELECT * FROM products WHERE id_product='${id}'`, (err, result) => {
            if (err) {
               reject(new Error(err))
            } else {
               resolve(new Promise((resolve, reject) => {
                  let imagename = null
                  if (!data.image) {
                     imagename = result[0].image
                  } else {
                     imagename = data.image
                     fs.unlink(`src/uploads/${result[0].image}`, (err) => {
                        if (err) throw err;
                        console.log('Image berhasil dihapus')
                        console.log(result[0].image)
                     })
                  }
                  db.query(`UPDATE products SET productname='${data.productname}',image='${data.image}',price='${data.price}',id_category='${data.id_category}' WHERE id_product='${id}'`, (err, resultUpdate) => {
                     if (err) {
                        reject(new Error(err))
                     } else {
                        resolve(resultUpdate)
                     }
                  })
               }))
            }
         })
      });
   },

   updatePatch: (data, id) => {
      return new Promise((resolve, reject) => {
         db.query(
            `UPDATE products SET ? WHERE id_product = ?`,
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
         db.query(`SELECT * FROM products WHERE id_product='${id}'`,
            (err, result) => {
               if (err) {
                  reject(new Error(err));
               } else {
                  resolve(
                     new Promise((resolve, reject) => {
                        db.query(
                           `DELETE FROM products WHERE id_product='${id}'`,
                           (err, resultDelete) => {
                              const imageName = result[0].image;
                              fs.unlink(`src/uploads/${imageName}`, (err) => {
                                 if (err) throw err;
                                 console.log(`Deleted id: ${id} success`);
                              });

                              if (err) {
                                 reject(new Error(err));
                              } else {
                                 resolve(resultDelete);
                              }
                           }
                        );
                     })
                  );
               }
            }
         );
      });
   },
};

module.exports = product;
