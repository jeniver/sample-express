
const moment = require("moment");
const SongModel = require('../models/song_Model')
const {Ok , ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')

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

const addSones = async (
    userId,
    albumname,
    songname,
    discription,
    createduser,
    image,
    url,
  ) => {
    let session = null;
    try {
      const songs = await new SongModel({
        user_id : userId , 
        album_name: albumname,
        song_name: songname,
        discription: discription,
        created_user: createduser,
        image: image,
        url: url
      });

      const addSonges = await songs.save();

      if (addSonges) {
        return await Ok("Event Created Sussesfully",addSonges);
          
      }
       
    } catch (error) {
      return await formatError(error)
    } 
  };


  const getAllSonges = async () => {
    try {
      const songList = await SongModel.find();
      return await Ok("Song list",songList);;
    } catch (error) {
      return console.log(error)
    }
  };

  

  module.exports = {
    addSones,
    getAllSonges
  };