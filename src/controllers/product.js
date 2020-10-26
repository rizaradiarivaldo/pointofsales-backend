const productModel = require("../models/product");
const { success, failed, successWithMeta } = require("../helpers/response");
const upload = require("../helpers/uploads");

const redis = require("redis");
const redisClient = redis.createClient();

const product = {
  getAll: (req, res) => {
    const name = !req.query.name ? "" : req.query.name;
    const sort = !req.query.sort ? "id_product" : req.query.sort;
    const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

    const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
    const page = !req.query.page ? 1 : parseInt(req.query.page);
    const offset = page <= 1 ? 0 : (page - 1) * limit;

    productModel
      .getAll(name, sort, typesort, limit, offset)
      .then((result) => {
        // redisClient.set("products", JSON.stringify(result));
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

    //getRedis 
    productModel.getAllData()
      .then((results) => {
        redisClient.set('products', JSON.stringify(results))
      }).catch((err) => {
        failed(result)
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
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          failed(res, [], 'File too large, Please select image less from 2mb');
        } else {
          failed(res, [], err.message)
        }
      } else {
        const body = req.body;
        body.image = req.file.filename;
        productModel
          .insert(body)
          .then((result) => {
            redisClient.del("products")
            success(res, result, "Insert data success");
          })
          .catch((err) => {
            failed(res, [], err.message);
          });
      }
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.image = !req.file ? req.file : req.file.filename;
    productModel
      .update(body, id)
      .then((result) => {
        redisClient.del("products")
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
        redisClient.del("products")
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
        redisClient.del("products")
        success(res, result, `Delete id: ${id} success`);
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
};


module.exports = product;
