const fs = require("fs");
const productModel = require("../models/product");
const { success, failed, successWithMeta } = require("../helpers/response");

const product = {
   getAll: (req, res) => {
      const name = !req.query.name ? "" : req.query.name;
      const sort = !req.query.sort ? "id_product" : req.query.sort;
      const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

      const limit = !req.query.limit ? 5 : parseInt(req.query.limit);
      const page = !req.query.page ? 1 : parseInt(req.query.page);
      const offset = page <= 1 ? 0 : (page - 1) * limit;

      productModel
         .getAll(name, sort, typesort, limit, offset)
         .then((result) => {
            const totalRows = result[0].count
            const meta = {
               total: totalRows,
               totalPage: Math.ceil(totalRows / limit),
               page: page
            }
            successWithMeta(res, result, meta, "Get all data success");

         })
         .catch((err) => {
            failed(res, [], err.message);
         });
   },

   getDetail: (req, res) => {
      const id = req.params.id;
      productModel
         .getDetail(id)
         .then((result) => {
            success(res, result, `Get id: ${id} success`);
         })
         .catch((err) => {
            failed(res, [], err.message);
         });
   },

   insert: (req, res) => {
      const body = req.body;
      body.image = req.file.filename;
      productModel
         .insert(body)
         .then((result) => {
            success(res, result, "Insert data success");
         })
         .catch((err) => {
            failed(res, [], err.message);
         });
   },

   update: (req, res) => {
      const id = req.params.id;
      const body = req.body;
      body.image = req.file.filename;
      productModel
         .update(body, id)
         .then((result) => {
            success(res, result, `Update id: ${id} success`);
         })
         .catch((err) => {
            failed(res, [], err.message);
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
      productModel
         .delete(id)
         .then((result) => {
            success(res, result, `Delete id: ${id} success`);
         })
         .catch((err) => {
            failed(res, [], err.message);
         });
   },
};

module.exports = product;
