
const express = require("express");
// const FCM  =  require('fcm-node');
// const SERVER_KEY = "AAAAD6WFyXs:APA91bENMpjQYszEME1SkQKvQto2pwKlp5CC8LjYPvgtsJ3bsGPn91RQIS5X0XRnGe08B2k_0O17Pi4VcboVXcMaNoobLQvZ1oAAGih_0Cl6sk5SBt-6e0WDI2zZsnXzwN_DpTC07xEF"
const app = express()
const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')
// mongodb user model
const notification = require("./../models/Notification_Model");
const formatError = (error) => {
    if (!error) return ServerError("Unknown error", error)
    const { statusCode } = error
    switch (statusCode) {
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


const getNotification = async (userid) => {
  try {
    const dataNotification = await notification.find() ; 
    if (dataNotification) {
      return Ok("notification",dataNotification);    ;
    }
    return BadRequest("invalide ")   
  } catch (error) {
    return formatError(error)
  } 

  
};




module.exports = {
    getNotification
  };