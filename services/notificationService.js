
const express = require("express");
const emailService = require('./email/emailService')
const emailTemplates = require('./email/templates')
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

const sendPasswordReset = (user) => {
  const resetLink = `${process.env.UI_URL}/reset-password?email=${user.email}&resetPasswordToken=${user.resetPasswordToken}`
  const email = new emailService()
  
  email.to(user.email)
    .template(emailTemplates.PASSWORD_RESET_REQUEST, {user: user, resetLink})
    .subject(`Password reset request`)
    .send();
}

const passwordChanged = (user) => {
  const email = new emailService()
  
  email.to(user.email)
    .template(emailTemplates.PASSWORD_CHANGED, {user: user})
    .subject(`Password changed`)
    .send();
}




module.exports = {
    getNotification,
    sendPasswordReset,
    passwordChanged,
  };