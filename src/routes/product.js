const express = require("express");
const productController = require("../controllers/product");
const upload = require("../helpers/uploads");
const { authentification, authorization } = require('../helpers/auth')

const { getProduct, getDetailProduct } = require('../helpers/redis')


const router = express.Router();

router
  .get("/getall", getProduct, productController.getAll)
  .get("/getdetail/:id", authentification, authorization, getDetailProduct, productController.getDetail)

  .post("/insert", authentification, authorization, productController.insert)

  .put("/update/:id", authentification, authorization, upload.single("image"), productController.update)

  .patch("/updatepatch/:id", authentification, authorization, productController.updatePatch)

  .delete("/delete/:id", authentification, authorization, productController.delete);

module.exports = router;
