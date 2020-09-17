const redis = require("redis");
const redisClient = redis.createClient();
const { success, successWithMeta, failed } = require('../helpers/response')

const _ = require('lodash')


module.exports = {
  getProduct: (req, res, next) => {
    const name = !req.query.name ? null : req.query.name;
    const Sortby = !req.query.sortby ? null : req.query.sortby
    const limit = !req.query.limit ? 5 : parseInt(req.query.limit)
    const page = !req.query.page ? 1 : parseInt(req.query.page)
    const start = page === 1 ? 0 : (page * limit) - limit
    const offset = start === 0 ? limit : start * limit


    redisClient.get('products', (err, reply) => {
      const data = JSON.parse(reply)
      if (name) {
        const dataFilter = data.filter(e => e.productname.toLowerCase().includes(name.toLowerCase()))
        if (dataFilter <= 0) {
          failed(res, data, `Data productname: ${name} not found! it's all data from redis product`)
        } else {
          success(res, dataFilter, 'Get data by name from redis success')
        }
      } else if (Sortby === 'productname') {
        const sort = data.sort((a, b) => a.productname.localeCompare(b.productname));
        success(res, sort, 'Get all data sort by Product Name')
      } else if (Sortby === 'price') {
        const prices = data.sort((a, b) => (a.price) - (b.price));
        success(res, prices, 'Get all data sort by Price')
      } else if (limit || page) {
        const output = _.slice(data, start, offset)
        // const meta = {
        //   totalRows: data.length,
        //   totalPages: Math.ceil(data.length / limit),
        //   page: page,
        //   limit: limit
        // }
        console.log("output")
        // successWithMeta(res, output, meta, 'Get with limit from redis success!')
      }
      else if (reply) {
        // const result = JSON.parse(reply)
        successWithMeta(res, data, null, 'Get all data from redis success!')
      }
      else {
        next()
      }
    })
  },

  getDetailProduct: (req, res, next) => {
    const id = req.params.id
    if (id) {
      redisClient.get('products', (err, reply) => {
        const data = JSON.parse(reply)
        const dataFilter = data.filter(e => e.id_product == id)
        console.log(dataFilter)
        if (dataFilter <= 0) {
          failed(res, [], 'Data Not Found!')
        } else {
          success(res, dataFilter, `Get data category by ID: ${id} from redis success!`)
        }
      })
    } else {
      next()
    }
  },

  getCategory: (req, res, next) => {
    const categoryname = !req.query.category ? false : req.query.category;
    const Sortby = !req.query.sortby ? null : req.query.sortby
    redisClient.get('category', (err, reply) => {
      const data = JSON.parse(reply)
      if (categoryname) {
        const dataFilter = data.filter(e => e.productname.toLowerCase().includes(categoryname.toLowerCase()))
        if (dataFilter <= 0) {
          failed(res, [], 'Data Not Found!')
        } else {
          success(res, dataFilter, 'Get data by Category Name from redis success!')
        }
      } else if (Sortby === 'category') {
        const sort = data.sort((a, b) => a.category.localeCompare(b.category));
        success(res, sort, 'Get all data sort by Category Name')
      } else if (reply) {
        const result = JSON.parse(reply)
        successWithMeta(res, result, null, 'Get all data category from redis success!')
      }
      else {
        next()
      }
    })
  },

  // getProducts: (req, res, next) => {
  //   redisClient.get('products', (err, reply) => {
  //     if (reply) {
  //       successWithMeta(res, JSON.parse(reply), null, 'Get all data from redis success :)')
  //     } else {
  //       next()
  //     }
  //   })
  // }
}
