const fs = require("fs");
const productModel = require("../models/product");
const { success, failed } = require("../helpers/response");

const product = {
  getAll: (req, res) => {
    const nama = !req.query.nama ? "" : req.query.nama;

    const limit = !req.query.limit ? "10" : parseInt(req.query.limit);

    const page = !req.query.page ? "1" : parseInt(req.query.page);

    const offset = page <= 1 ? "0" : (page - 1) * limit;

    const sortby = !req.query.sortby ? "id_product" : req.query.sortby;
    const typesort = !req.query.typesort ? "ASC" : req.query.typesort;
    productModel
      .getAll(nama, sortby, typesort, limit, offset)
      .then((result) => {
        success(res, result, "Get all data success");
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
