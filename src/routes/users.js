const express = require("express");
const usersController = require("../controllers/users");


const router = express.Router();

router.post("/register", usersController.register);

router.get("/active/:token", usersController.active);

router.put('/update/:id', usersController.update);

router.delete('/delete/:id', usersController.delete);

router.post("/login", usersController.login);

router.post("/logout/:id", usersController.logout);


router.post('/tokenrefresh', usersController.tokenrefresh);
module.exports = router;
