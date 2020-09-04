const express = require("express");
const productController = require("../controllers/product");
const upload = require("../helpers/uploads");

const router = express.Router();

router
   .get("/getall", productController.getAll)
   .get("/getdetail/:id", productController.getDetail)

   .post("/insert", upload.single("image"), productController.insert)

   .put("/update/:id", upload.single("image"), productController.update)

   .patch("/updatepatch/:id", productController.updatePatch)

   .delete("/delete/:id", productController.delete);

module.exports = router;
