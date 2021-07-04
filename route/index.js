const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const validator = require("../validater/userValidater");

router.post("/signup", validator.registerProfile, (req, res, next) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res
      .status(400)
      .json({
        errors: validate.array().map(({ msg, param }) => ({ msg, param })),
      });
  }
  userController.singUp(req, res, next);
});

router.post("/signin",  userController.singIn);

module.exports = router;
