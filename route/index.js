const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const EventControllers = require("../controller/eventControllers");
const validator = require("../validater/userValidater");
const Eventvalidator = require("../validater/eventValidater");

router.post("/signup", validator.registerProfile, (req, res, next) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({
      errors: validate.array().map(({ msg, param }) => ({ msg, param })),
    });
  }
  userController.singUp(req, res, next);
});

router.post("/signin", userController.singIn);

router.get("/getuserinfo", userController.getUserInfo);

router.post("/createevent",EventControllers.addEvent)

router.get("/getallevent", EventControllers.fetchAllEvents);

module.exports = router;
