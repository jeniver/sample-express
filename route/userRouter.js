const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const {upload} = require('../helper/filehelper');

router.post("/signin", userController.singIn);
router.post("/addUser",upload.array('files'),userController.addUser);
router.get("/getusers", userController.getAllUsers);
router.get("/getuserinfo", userController.getUserInfo);
router.post("/userupdate" ,upload.array('files'), userController.editUsers);
module.exports = router;