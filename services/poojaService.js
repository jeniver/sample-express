
const moment = require("moment");
const PoojaModel = require('../models/Pooja_Model')
const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')
const { eventEmails } = require("../helper/email-Config")
const { sendNotificationToDevice } = require('../helper/firebase_cm')
const notification = require("../models/Notification_Model");
const Pooja_Model = require("../models/Pooja_Model");
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

const addPooja = async (
  title,
  temple,
  type,
  expected_participants_count,
  status,
  notification_type,
  startDateTime,
      endDateTime,
) => {
  console.log("end Dtae time")
  console.log(endDateTime)
  let session = null;
  try {
    const pooja = await new PoojaModel({
      title,
      temple,
      type,
      expected_participants_count,
      status,
      notification_type,
      startDateTime,
      endDateTime,
    });
    const PoojaDetails = await PoojaModel.find({ title});
    if (PoojaDetails.length > 0) {
      return Ok("Sorry! Pooja already exist", PoojaDetails)
    } else {
      const creatPooja = await pooja.save();
      if (creatPooja) {
        return await Ok("Great! Pooja Created Sussesfully", creatPooja);
      }
    }

    // const notficationadd = await new notification({ user_id: userId, notification_type: "POOJA", message: temple });

    // const createdEvents = await events.save();
    // const AddNotification = await notficationadd.save();

    // if (createdEvents) {
    //   let notification = {
    //     body: "07/11/2021",
    //     title: "Sivan kovil"
    //   }
    //   eventEmails()
    //   if (AddNotification) {
    //     sendNotificationToDevice("dWQN4mtKcHfAWT5FNT42fj:APA91bHLxZYkirv6Np5VYjXqCa9vZEE5rRiIFsHMEriGLvQuYHGpNZizIxIHIsRYkRN4_h2WN5Z2H8CMdjdnolmr4VPHJpetyvQYKM3v12efeSQFrSa2x2S4QuJERU5c_DUjL-yA2Qfh", notification, createdEvents);
    //   }
    //   return await Ok("Event Created Sussesfully", createdEvents);
    // }

  } catch (error) {
    return await formatError(error)
  }
};


const getAllPooja = async () => {
  try {
    const Poojs = await Pooja_Model.find();
    return await Ok("Event list", Poojs);;
  } catch (error) {
    return console.log(error)
  }
};

// const filterEvents = async (templeType, temple_name) => {
//   try {
//     const Events = await EventModal.find({
//       created_temple: temple_name,
//       tempele_type: templeType
//     });
//     return await Ok("Event filter res", Events);;
//   } catch (error) {
//     return console.log(error)
//   }
// };

module.exports = {
  addPooja,
  getAllPooja
  // getAllEvents,
  // filterEvents
};

