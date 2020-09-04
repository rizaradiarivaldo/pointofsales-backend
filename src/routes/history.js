const express = require("express");
const historyController = require("../controllers/history");
const router = express.Router();

router
   .get("/getall", historyController.getAll)
   .get('/getdetail/:id', historyController.getDetail)

   .post("/insert", historyController.insert)

   .put("/update/:id", historyController.update)

   .patch("/updatepatch/:id", historyController.updatePatch)

   .delete("/delete/:id", historyController.delete);



module.exports = router;
