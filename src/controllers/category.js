const categoryModel = require("../models/category");
const response = require("../helpers/response");

const category = {
   getall: (req, res) => {
      const name = !req.query.name ? '' : req.query.name
      const sort = !req.query.sort ? 'id_category' : req.query.sort
      const typesort = !req.query.typesort ? "ASC" : req.query.typesort

      const limit = !req.query.limit ? 5 : req.query.limit
      const page = !req.query.page ? 1 : req.query.page
      const offset = page <= 1 ? '0' : (page - 1) * limit

      categoryModel
         .getall(name, sort, typesort, limit, offset)
         .then((result) => {
            const totalRows = result[0].count
            const meta = {
               total: totalRows,
               totalPage: Math.ceil(totalRows / limit),
               page: page
            }
            response.successWithMeta(res, result, meta, "Get all data success");
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },

   getdetail: (req, res) => {
      const id = req.params.id
      categoryModel
         .getdetail(id)
         .then((result) => {
            response.success(res, result, `Get all data success`);
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },

   insert: (req, res) => {
      const body = req.body;
      categoryModel
         .insert(body)
         .then((result) => {
            response.success(res, result, `Insert data success`);
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },
   update: (req, res) => {
      const id = req.params.id;
      const body = req.body;

      categoryModel
         .update(body, id)
         .then((result) => {
            response.success(res, result, `Update data success`);
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },

   delete: (req, res) => {
      const id = req.params.id;
      categoryModel
         .delete(id)
         .then((result) => {
            response.success(res, result, `Delete data success`);
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },
};

module.exports = category;
