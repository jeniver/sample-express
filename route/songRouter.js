const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const songController = require("../controller/songController");
const {upload} = require('../helper/filehelper');

router.post("/addSong",upload.array('files'),songController.addSongs);
// router.get("/getusers", userController.getAllUsers);

module.exports = router;