const express = require("express");
const categoryController = require("../controllers/category");
const { authentification, authorization, admin } = require('../helpers/auth')

const { getCategory } = require('../helpers/redis')

const router = express.Router();

router
  .get("/getall", authentification, authorization, getCategory, categoryController.getall)
  .get("/getdetail/:id", authentification, authorization, categoryController.getdetail)
  .post("/insert", authentification, authorization, admin, categoryController.insert)
  .put("/update/:id", authentification, authorization, admin, categoryController.update)
  .delete("/delete/:id", authentification, authorization, admin, categoryController.delete);

module.exports = router;
