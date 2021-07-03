const express = require("express");
const APIError = require("../helper/api-error");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


// mongodb user model
const User = require("./../models/User_Model");

// Password handler
const app = express();

const singUp = async (name, email, password) => {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const userDetails = await User.find({ email });
    if (userDetails.length > 0) {
      console.log("wrong")
    } else {
      const newUser = new User({ name, email, password });
      const addUsers = await newUser.save({ session });
      if (addUsers) {
        await session.commitTransaction();
        return addUsers;
      }
    }
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    throw new Error(error);
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
          return 
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
          return  response 
      }
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw new Error(error);
    } finally {
      session.endSession();
    }


}



module.exports = {
  singUp,
  singIn
};
