const HotelServices = require("../services/hotelServices");

const addHotels = async (req, res, next) => {
  try {
    const {
      userId,
      titel,
      room,
      roomtype,
      facility,
      discription,
      price,
      person_count
    } = req.body;
    const files = req.files;
    const data = await HotelServices.addHotels(
      userId,
      titel,
      room,
      roomtype,
      facility,
      discription,
      price,
      person_count,
      files
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editHotels = async (req, res, next) => {
    try {
      const {
        hotelId,
        userId,
        titel,
        room,
        roomtype,
        facility,
        discription,
        price,
        person_count
      } = req.body;
      const files = req.files;
      const data = await HotelServices.updateHotel(
        hotelId,
        userId,
        titel,
        room,
        roomtype,
        facility,
        discription,
        price,
        person_count,
        files
      );
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };


  const getHotelInfo = async (req, res, next) => {
    try {
      const { hotelid } = req.query;
      const response = await HotelServices.getHotelsDetails(hotelid);
      return res.status(response.status).json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getHotels = async (req, res, next) => {
    try {
      const response = await HotelServices.getAllHotels();
      return res.status(response.status).json(response);
    } catch (error) {
      return next(error);
    }
  };


  const removeHotel = async (req, res, next) => {
    try {
      const { hotelid } = req.query;
      const response = await HotelServices.deleteHotel(hotelid);
      return res.status(response.status).json(response);
    } catch (error) {
      return next(error);
    }
  };



module.exports = {
addHotels,
editHotels,
getHotelInfo,
getHotels,
removeHotel
};
