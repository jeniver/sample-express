
const moment = require("moment");
const SongModel = require('../models/song_Model')
const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')

const formatError = (error) => {
  if (!error) return ServerError("Unknown error", error)
  const { statusCode } = error
  switch
  (statusCode) {
    case 400:
      return BadRequest(error)
    case 401:
      return Unauthorised(error)
    case 403:
      return Forbidden(error)
    case 404:
      return NotFound(error)
    default:
      return ServerError(error)
  }

}

const addSongs = async (album_name,song_name,singer,image,url) => {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const songDetails = await SongModel.find({ song_name });
    if (songDetails.length > 0) {
        return Ok("Song Name already exist",songDetails)
    } else {
      const newSong = new SongModel({ album_name,song_name,singer,image,url});
      const addSong = await newSong.save({ session });
      if (addSong) {
        await session.commitTransaction();
        return Ok("Great! Song add successfully",addSong);
      }
    }
  } catch (error) {
    await session.abortTransaction();
    return formatError(error)
  } finally {
    session.endSession();
  }
};


const getAllSonges = async () => {
  try {
    const songList = await SongModel.find();
    return await Ok("Song list", songList);;
  } catch (error) {
    return console.log(error)
  }
};



module.exports = {
  addSongs,
  getAllSonges
};