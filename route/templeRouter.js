const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const templeController = require("../controller/TempleController");
const {upload} = require('../helper/filehelper');

router.post("/addTemple",upload.array('files'),templeController.addTemple);
router.get("/getTemple" , templeController.getTemple )

module.exports = router;