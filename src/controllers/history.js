const historyModel = require("../models/history");
const response = require("../helpers/response");

const history = {
   getAll: (req, res) => {
      const sort = !req.query.sort ? "id" : req.query.sort
      const typesort = !req.query.typesort ? "ASC" : req.query.typesort

      const limit = !req.query.limit ? 5 : parseInt(req.query.limit);
      const page = !req.query.page ? 1 : parseInt(req.query.page);
      const offset = page <= 1 ? 0 : (page - 1) * limit;

      historyModel
         .getAll(sort, typesort, limit, offset)
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

   getDetail: (req, res) => {
      const id = req.params.id;
      historyModel
         .getDetail(id)
         .then((result) => {
            response.success(res, result, "Get all data success");
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },

   insert: (req, res) => {
      const data = req.body;
      // console.log(body);
      historyModel
         .insert(data)
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
      historyModel
         .update(body, id)
         .then((result) => {
            response.success(res, result, `Update id: ${id} success`);
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },

   updatePatch: (req, res) => {
      const id = req.params.id;
      const body = req.body;
      productModel
         .updatePatch(body, id)
         .then((result) => {
            success(res, result, `Update id: ${id} success`);
         })
         .catch((err) => {
            failed(res, [], err.message);
         });
   },

   delete: (req, res) => {
      const id = req.params.id;
      historyModel
         .delete(id)
         .then((result) => {
            response.success(res, result, `Delete id ${id} success`);
         })
         .catch((err) => {
            response.failed(res, [], err.message);
         });
   },
};

module.exports = history;