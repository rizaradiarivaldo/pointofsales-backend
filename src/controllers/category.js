const categoryModel = require("../models/category");
const response = require("../helpers/response");

const category = {
  getall: (req, res) => {
    categoryModel
      .getall()
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
