const SongServices = require("../services/songServics");
console.log("song controller")

const addSongs = async (req, res, next) => {
  try {
    const {
      album_name,
      song_name,
      singer,
    } = JSON.parse(req.body.data);
    const song_images = req.files;
    console.log("Files")
    console.log(song_images)
    const url="";
    const data = await SongServices.addSongs(
      album_name,
      song_name,
      singer,
      song_images,
      url
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
  addSongs,
  getSonges
};
