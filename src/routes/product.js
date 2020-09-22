const express = require("express");
const productController = require("../controllers/product");
const upload = require("../helpers/uploads");
const { authentification, admin, authorization } = require('../helpers/auth')

const { getProduct, getDetailProduct } = require('../helpers/redis')


const router = express.Router();

router
  .get("/getall",authentification, authorization, productController.getAll)
  .get("/getdetail/:id", authentification, authorization, getDetailProduct, productController.getDetail)

  .post("/insert", authentification, authorization, admin, productController.insert)

  .put("/update/:id", authentification, authorization, admin, upload.single("image"), productController.update)

  .patch("/updatepatch/:id", authentification, authorization, admin, productController.updatePatch)

  .delete("/delete/:id", authentification, authorization, admin, productController.delete);

module.exports = router;
