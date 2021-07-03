const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')


router.post("/signup" , userController.singUp)



module.exports = router;