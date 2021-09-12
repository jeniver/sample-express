const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const EventControllers = require("../controller/eventControllers");
const validator = require("../validater/userValidater");
const Eventvalidator = require("../validater/eventValidater");
const SongController = require("../controller/songController")
const Notification =require("../controller/notificationContrller");

const {upload} = require('../helper/filehelper');
const HotelReserversion = require('../controller/HotelResrversionControllers')
const ProductController = require('../controller/ProductController');
const PaymentController=require('../controller/paymentController')
const DonationController = require('../controller/DonationController');

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
router.post("/userupdate" , userController.editUsers);
router.get("/getuserinfo", userController.getUserInfo);
router.get("/getusers", userController.getAllUsers);
router.get("/removeUser/:id" , userController.removeUser);
router.post("/addUser" , upload.array('files') , userController.addUser)

router.post("/createevent",EventControllers.addEvent);
router.get("/getallevent", EventControllers.fetchAllEvents);
router.get("/notification", Notification.notification);
router.get("/removeEvent/:id" , EventControllers.removeEvent)

router.post("/uploadesong" , SongController.addSonges);
router.get("/get_songe" , SongController.getSonges);

router.post("/forgot-password",validator.forgetPassword, async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: validate.array().map(({ msg, param }) => ({ msg, param })),
    });
  }
    userController.sendPasswordReset(req, res, next);

})

router.post("/add-hotel" , upload.array('files') , HotelReserversion.addHotels )
router.post("/edit-hotel" , upload.array('files') , HotelReserversion.editHotels )
router.get("/getHotels" , HotelReserversion.getHotels )
router.get("/hotelinfo" , HotelReserversion.getHotelInfo )
router.get("/removeHotel" , HotelReserversion.removeHotel)


router.post("/add-prod" , upload.array('files') , ProductController.addProduct )
router.post("/edit-prod" , upload.array('files') , ProductController.editProducts )
router.get("/getproduct" , ProductController.getProducts )
router.get("/productinfo" , ProductController.getProductInfo)
router.get("/removeproduct" , ProductController.removeProduct)

router.post('/razorpay',ProductController.razorpay_payment);
router.post('/donation', DonationController.createDonation);

module.exports = router;
