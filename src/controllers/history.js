const historyModel = require("../models/history");
const { success, successWithMeta, failed } = require("../helpers/response");

const history = {
  getAll: (req, res) => {
    const sort = !req.query.sort ? "id" : req.query.sort;
    const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

    const limit = !req.query.limit ? 5 : parseInt(req.query.limit);
    const page = !req.query.page ? 1 : parseInt(req.query.page);
    const offset = page <= 1 ? 0 : (page - 1) * limit;

    historyModel
      .getAll(sort, typesort, limit, offset)
      .then((result) => {
        const totalRows = result[0].count;
        const meta = {
          total: totalRows,
          totalPage: Math.ceil(totalRows / limit),
          page: page,
        };
        successWithMeta(res, result, meta, "Get all data success");
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },

  getDetail: (req, res) => {
    const id = req.params.id;
    historyModel
      .getDetail(id)
      .then((result) => {
        success(res, result, "Get all data success");
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },

  //insert data to master & insert data to detail
  insert: (req, res) => {
    const data = req.body
    historyModel
      .insertMaster(data)
      .then((result) => {
        const idMaster = result.insertId
        const insertDetail = data.detail.map((item) => {
          historyModel.insertDetail(item, idMaster)
        })
        Promise.all(insertDetail)
          .then(() => {
            success(res, result, `Insert data success`);
          }).catch((err) => {
            failed(res, [], 'Insert data failed')
          });
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },

  update: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    historyModel
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
    historyModel
      .delete(id)
      .then((result) => {
        success(res, result, `Delete id ${id} success`);
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
};

module.exports = history;
