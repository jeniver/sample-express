
const moment = require("moment");
const HotelModal = require('../models/Hotel_Model')
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


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


 const addHotels = async (
    userId,
    titel,
    room,
    roomtype,
    facility,
    discription,
    price,
    person_count,
    files
  ) => {
    let session = null;
    console.log(room , files )
    try {
        let filesArray = [];
        files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const hotel = await new HotelModal({
            user_id : userId ,
            titel:titel,
            room:room,
            room_type:roomtype,
            room_images:filesArray,
            discription:discription,
            facility_list:facility,
            person_count:person_count,
            price:price


          });
      const createdHotels = await hotel.save();
      if (createdHotels) {
        return  await Ok("Hotel Created Sussesfully",createdHotels);
      }
       
    } catch (error) {
        console.log(error)
      return await formatError(error)
    } 
  };


  const updateHotel = async (
    hotelId,
    userId,
    titel,
    room,
    roomtype,
    facility,
    discription,
    price,
    person_count,
    files,
    discount  ) => {
    let session = null;
    try {
        let filesArray = [];
        files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
      const hotel = await  HotelModal.findOneAndUpdate(
        { _id: hotelId },
        {
        user_id : userId , 
        titel : titel,
        room,
        room_type:roomtype,
        room_images:filesArray,
        discription:discription,
        price,
        facility_list:facility,
        person_count,
        discount   
      });
      if (hotel) {
        return  await Ok("Hotel Update Sussesfully",hotel);
      }    
    } catch (error) {
        console.log("test" , error)
      return await formatError(error)
    } 
  };

  const getAllHotels = async () => {
    try {
      const hotels = await HotelModal.find();
      return await Ok("Hotel list",hotels);;
    } catch (error) {
      return console.log(error)
    }
  };

  const getHotelsDetails = async (hotelId) => {
    try {
        const getHotel = await HotelModal.findOne({ _id: hotelId }).lean() ; 
        if (getHotel) {
          return Ok("get Hotel Info",getHotel);    ;
        }
       
      } catch (error) {
        console.log(error)
        
      }
  };



  const deleteHotel = async (hotelId) => {
    try {
        const removeHotel = await HotelModal.findOneAndDelete({ _id: hotelId });
        if (removeHotel) {
          return Ok("Remved  Hotel Info",removeHotel);    ;
        }
       
      } catch (error) {
        console.log(error)
        
      }
  }



module.exports = {
addHotels, 
updateHotel,
getAllHotels,
getHotelsDetails,
deleteHotel
};

  