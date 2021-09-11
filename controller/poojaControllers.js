const PoojaService = require("../services/poojaService");
console.log("Pooja controller")
const addPooja = async (req, res, next) => {
  
  try {
    const {
      title,
      temple,
      type,
      expected_participants_count,
      status,
      startDateTime,
      endDateTime,
    } = JSON.parse(req.body.data);
    console.log("Pooja Controller end date time")
    console.log(
      endDateTime
    )
    const data = await PoojaService.addPooja(
      title,
      temple,
      type,
      expected_participants_count,
      status,
      startDateTime,
      endDateTime,
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

// const fetchAllPooja = async (req, res, next) => {
//   try {
//     const response = await EventService.getAllEvents();
//     return res.status(response.status).json(response);
//   } catch (error) {
//     return next(error);
//   }
// };


// const fetchFilterPooja = async (req, res, next) => {
//   try {
//     const {templeType , temple_name} = req.body;
//     const response = await EventService.filterEvents(templeType , temple_name);
//     return res.status(response.status).json(response);
//   } catch (error) {
//     return next(error);
//   }
// };

const getAllPooja=async(req,res,next)=>{
  try {
    const response = await PoojaService.getAllPooja();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addPooja,
  getAllPooja
  // fetchAllPooja,
  // fetchFilterPooja
};
