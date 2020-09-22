const express = require("express");
const historyController = require("../controllers/history");
const router = express.Router();

const { authentification, authorization } = require('../helpers/auth')
router
  .get("/getall", authentification, authorization, historyController.getAll)
  .get("/getdetail/:id", authentification, authorization, historyController.getDetail)

  .post("/insert", authentification, authorization, historyController.insert)

  .put("/update/:id", authentification, authorization, historyController.update)

  .patch("/updatepatch/:id", authentification, authorization, historyController.updatePatch)

  .delete("/delete/:id", authentification, authorization, historyController.delete);

module.exports = router;
