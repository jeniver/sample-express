const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const PoojaControllers = require("../controller/poojaControllers");
const validator = require("../validater/userValidater");
const Eventvalidator = require("../validater/eventValidater");
const SongController = require("../controller/songController")
const Notification =require("../controller/notificationContrller");
const {upload} = require('../helper/filehelper');
const HotelReserversion = require('../controller/HotelResrversionControllers')
const ProductController = require('../controller/ProductController');
console.log(123)

//user
router.post("user/signup",userController.singUp);
router.post("user/signin", userController.singIn);
// router.post("user/addUser",upload.array('files'),userController.addUser);
router.post("user/userupdate" ,upload.array('files'), userController.editUsers);
router.get("user/getuserinfo", userController.getUserInfo);

router.post("user/forgot-password",validator.forgetPassword, async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: validate.array().map(({ msg, param }) => ({ msg, param })),
    });
  }
    userController.sendPasswordReset(req, res, next);

})

//Pooja
// router.post("/createPooja",PoojaControllers.addPooja);
// router.post("/editPooja" , upload.array('files') , EventControllers.editPooja )
// router.get("/getPooja", EventControllers.fetchAllPooja);
// router.get("/filterPooja", EventControllers.fetchFilterPooja);
// router.get("/removePooja" , EventControllers.removePooja)

//Temple
// router.post("/addTemple" , upload.array('files') , ProductController.addProduct )
// router.post("/editTemple" , upload.array('files') , ProductController.editProducts )
// router.get("/getTemple" , ProductController.getProducts )
// router.get("/templeinfo" , ProductController.getProductInfo)
// router.get("/removeTemple" , ProductController.removeProduct)

//Product

// router.post("/edit-prod" , upload.array('files') , ProductController.editProducts )
// router.get("/getproduct" , ProductController.getProducts )
// router.get("/productinfo" , ProductController.getProductInfo)
// router.get("/removeproduct" , ProductController.removeProduct)

//Chat

//Songs
// router.post("/addSong" , SongController.addSonges);
// router.get("/get_songe" , SongController.getSonges);

//Campaign
// router.post("/addCampaign" , SongController.addSonges);

//Order details

//Hotel Reserversion
// router.post("/add-hotel" , upload.array('files') , HotelReserversion.addHotels )
// router.post("/edit-hotel" , upload.array('files') , HotelReserversion.editHotels )
// router.get("/getHotels" , HotelReserversion.getHotels )
// router.get("/hotelinfo" , HotelReserversion.getHotelInfo )
// router.get("/removeHotel" , HotelReserversion.removeHotel)

//Booking List

//Taxi Booking

//Payment
// router.post('/razorpay',ProductController.razorpay_payment);

//notification
// router.get("/notification", Notification.notification);







module.exports = router;
