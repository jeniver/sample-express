const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const validator = require('../validater/userValidater')


router.post("/signup" , validator.registerProfile , userController.singUp)



module.exports = router;