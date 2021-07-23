const SongServices = require("../services/songServics");

const addSonges = async (req, res, next) => {
  try {
    const {
        userId,
        albumname,
        songname,
        discription,
        createduser,
        image,
        url,
    } = req.body;
    const data = await SongServices.addSones(
        userId,
        albumname,
        songname,
        discription,
        createduser,
        image,
        url,
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getSonges = async (req, res, next) => {
  try {
    const response = await SongServices.getAllSonges();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addSonges,
  getSonges
};
