const historyModel = require("../models/history");

const response = require("../helpers/response");

const history = {
  getAll: (req, res) => {
    historyModel
      .getAll()
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
