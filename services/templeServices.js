const express = require("express");
const APIError = require("../helper/api-error");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require('jsonwebtoken')
const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const formatError = (error) => {
  console.log("error")
  console.log(error)

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

const fileSizeFormatter = (bytes, decimal) => {
  if(bytes === 0){
      return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


// mongodb user model
const Temple = require("./../models/Temple_modal");
const app = express();

const AddTemple = async (name, templeType,templeAdmin,mainTemple, location ,mobile_no,description,temp_images) => {

  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const templeDetails = await Temple.find({ name });
    if (templeDetails.length > 0) {
        return Ok("Temple Name already exist",templeDetails)
    } else {
      const newTemple = new Temple({ name, templeType,templeAdmin,mainTemple, location ,mobile_no,description,temp_images });
      const addTemple = await newTemple.save({ session });
      if (addTemple) {
        await session.commitTransaction();
        return Ok("Great! Temple add successfully",addTemple);
      }
    }
  } catch (error) {
    await session.abortTransaction();
    return formatError(error)
  } finally {
    session.endSession();
  }
};

const getAllTemples = async () => {
    try {
      const temples = await Temple.find();
      return await Ok("Temple list", temples);;
    } catch (error) {
      return console.log(error)
    }
  };

module.exports = {
  AddTemple,
  getAllTemples
};
