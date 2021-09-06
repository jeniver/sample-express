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
const User = require("./../models/User_Model");

// Password handler
const app = express();

const singUp = async (name, email, password , phone_number) => {
  let session = null;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const userDetails = await User.find({ email });
    if (userDetails.length > 0) {
        return BadRequest("Soory! Email Address already exist")
    } else {
      const newUser = new User({ name, email , mobile_number : phone_number, password : hash });
      const addUsers = await newUser.save({ session });
      if (addUsers) {
        await session.commitTransaction();
        return Ok("Great Job! Signup successfully",addUsers);
      }
    }
  } catch (error) {
    await session.abortTransaction();
    return BadRequest("Soory! Connection Error");
  } finally {
    session.endSession();
  }
};


const singIn = async ( email , password ) => {
    let session = null;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      const access = moment().add(60 , 'minutes');
      const playload = {
        exp: access.unix(),
        iat: moment().unix(),
        sub: {
          id: this._id, // eslint-disable-line
          type: 'user',
        },
      };

      const user = await User.findOne({ email }).lean()
      if (!user) {
        console.log(55)
          return BadRequest("Invalid Email or Password")
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
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id},
            {
              token_data: {
                access_token: jwt.sign(playload, JWT_SECRET),
                access_token_exp: access,
                refresh_token: JWT_SECRET,
                refresh_token_exp: 60* 60,
              },
              updated: moment(),
            },
            { new: true, session }
          );
          return  Ok("SignIn successfully",user);  
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


const getUserInfo = async (userId) => {
  console.log(userId)
  try {
    const getUser = await User.findOne({ _id: userId }).lean() ; 
    if (getUser) {
      console.log(getUser)
      return Ok("get user Info",getUser);    ;
    }
   
  } catch (error) {
    console.log(error)
    
  }
};

const getAllUsers = async () => {
  try {
    const UserList = await User.find();
    return await Ok("User list",UserList);;
  } catch (error) {
    return console.log(error)
  }
};

const UpdateUsers = async (
  userName, 
      email, 
      mobile,
  profile_Pic ) => {
  let session = null;
  var userId="6133bb240b8c194e8003f918"
  try {
    console.log("UserService")
    console.log(userName,email,profile_Pic,mobile)
      let filesArray = [];
      profile_Pic.forEach(element => {
          const file = {
              fileName: element.originalname,
              filePath: element.path,
              fileType: element.mimetype,
              fileSize: fileSizeFormatter(element.size, 2)
          }
          filesArray.push(file);
      });
    const users = await  User.findOneAndUpdate(
      { _id: userId },
      {
        name:userName, 
        email,  
        mobile_number: mobile,
        profile_images:filesArray,
     
    });
    if (users) {
      return  await Ok("Users Update Sussesfully",users);
    }    
  } catch (error) {
      console.log("test" , error)
    return await formatError(error)
  } 
}

const AddUser = async (name, user_level,email,address, password , phoneNumber,pro_img) => {
  console.log("UserService")
  console.log(name,user_level,email,address,password,phoneNumber,pro_img)
  let session = null;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const userDetails = await User.find({ email });
    if (userDetails.length > 0) {
        return Ok("Email Address already exist",userDetails)
    } else {
      const newUser = new User({ name, email ,user_level,profile_images:pro_img, mobile_number : phoneNumber, password : hash });
      const addUsers = await newUser.save({ session });
      if (addUsers) {
        await session.commitTransaction();
        return Ok("User add successfully",addUsers);
      }
    }
  } catch (error) {
    await session.abortTransaction();
    return formatError(error)
  } finally {
    session.endSession();
  }
};


module.exports = {
  singUp,
  singIn,
  getUserInfo,
  getAllUsers,
  UpdateUsers,
  AddUser
};
