const express = require("express");
const APIError = require("../helper/api-error");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

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


// mongodb user model
const User = require("./../models/User_Model");

// Password handler
const app = express();

const singUp = async (name, email, password) => {
  let session = null;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const userDetails = await User.find({ email });
    if (userDetails.length > 0) {
        return BadRequest("record alrady exciestUser with the provided email already exists")
    } else {
      const newUser = new User({ name, email, password : hash });
      const addUsers = await newUser.save({ session });
      if (addUsers) {
        await session.commitTransaction();
        return Ok("Signup successfully",addUsers);
      }
    }
  } catch (error) {
    await session.abortTransaction();
    return formatError(error)
  } finally {
    session.endSession();
  }
};


const singIn = async ( email , password ) => {
    let session = null;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      const user = await User.findOne({ email }).lean()

      if (!user) {
          return BadRequest("Invalid Email id")
      }
  
      if (await bcrypt.compare(password, user.password)) {
          // the username, password combination is successful
          await session.commitTransaction();
          const token = jwt.sign(
			{
				id: user._id,
				username: user.name
			},
			JWT_SECRET
		)
        const response = { data: user , accesstoken : token }
          return  Ok("SignIn successfully",response);  
      }
      return BadRequest("Invalid Password / Invalid Email id ")
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      return formatError(error)
    } finally {
      session.endSession();
    }


}



module.exports = {
  singUp,
  singIn
};
