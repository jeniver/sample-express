const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const PoojaController = require("../controller/poojaControllers");
const {upload} = require('../helper/filehelper');

router.post("/addPooja" , upload.array('files') , PoojaController.addPooja)
router.get("/getAllPooja" , PoojaController.getAllPooja )

module.exports = router;