const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const {upload} = require('../helper/filehelper');

router.post("/addUser",upload.array('files'),userController.addUser);

module.exports = router;