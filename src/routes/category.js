const express = require("express");
const categoryController = require("../controllers/category");

const router = express.Router();

router
   .get("/getall", categoryController.getall)
   .get("/getdetail/:id", categoryController.getdetail)
   .post("/insert", categoryController.insert)
   .put("/update/:id", categoryController.update)
   .delete("/delete/:id", categoryController.delete);

module.exports = router;
