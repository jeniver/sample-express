
const moment = require("moment");
const EventModal = require('../models/Eevent_Model')
const {Ok , ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')
const {eventEmails} = require("../helper/email-Config")
const { sendNotificationToDevice } =  require('../helper/firebase_cm')
const notification = require("./../models/Notification_Model");
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


 const addEvent = async (
    userId,
    destination,
    participantsCount,
    expectedParticipantsCount,
    requestData,
    message,
    temple,
    status,
    notificationType
  ) => {
    let session = null;
    try {
      const events = await new EventModal({
        user_id : userId , 
        destination: destination,
        notification_type: notificationType,
        message: message,
        status: status,
        participants_count: participantsCount,
        expected_participants_count: expectedParticipantsCount,
        request_data: moment(requestData),
        created_temple: temple,
      });

      const notficationadd = await new notification({ user_id: userId , notification_type : "POOJAI"  , message:temple });
  
      const createdEvents = await events.save();
      const AddNotification = await notficationadd.save();

      if (createdEvents) {
        let notification = {
          body:"07/11/2021",
          title:"Sivan kovil"
        }
        eventEmails()
        if(AddNotification){
        sendNotificationToDevice("dWQN4mtKcHfAWT5FNT42fj:APA91bHLxZYkirv6Np5VYjXqCa9vZEE5rRiIFsHMEriGLvQuYHGpNZizIxIHIsRYkRN4_h2WN5Z2H8CMdjdnolmr4VPHJpetyvQYKM3v12efeSQFrSa2x2S4QuJERU5c_DUjL-yA2Qfh", notification, createdEvents);
        }
        return  await Ok("Event Created Sussesfully",createdEvents);
      }
       
    } catch (error) {
      return await formatError(error)
    } 
  };


  const getAllEvents = async () => {
    try {
      const Events = await EventModal.find();
      return await Ok("Event list",Events);;
    } catch (error) {
      return console.log(error)
    }
  };

  

  module.exports = {
    addEvent,
    getAllEvents
  };

  