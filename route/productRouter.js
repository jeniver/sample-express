const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const ProductController = require("../controller/productController");
const {upload} = require('../helper/filehelper');

router.post("/addProduct" , upload.array('files') , ProductController.addProduct )
router.get("/getproduct" , ProductController.getProducts )

module.exports = router;