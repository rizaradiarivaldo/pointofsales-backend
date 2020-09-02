const express = require("express");
const historyController = require("../controllers/history");
const router = express.Router();

router
  .get("/getall", historyController.getAll)
  .post("/insert", historyController.insert)
  .put("/update/:id", historyController.update)
  .delete("/delete/:id", historyController.delete);

module.exports = router;
