const express = require("express");
const APIError = require("../helper/api-error");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

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

// Signup
// router.post("/signup", (req, res) => {
//   let { name, email, password } = req.body;
//   name = name.trim();
//   email = email.trim();
//   password = password.trim();
// console.log( name, email, password  )
//   if (name == "" || email == "" || password == "") {
//     res.json({
//       status: "FAILED",
//       message: "Empty input fields!",
//     });
//   } else if (!/^[a-zA-Z ]*$/.test(name)) {
//     res.json({
//       status: "FAILED",
//       message: "Invalid name entered",
//     });
//   } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//     res.json({
//       status: "FAILED",
//       message: "Invalid email entered",
//     });
//   } else if (password.length < 8) {
//     res.json({
//       status: "FAILED",
//       message: "Password is too short!",
//     });
//   } else {
//     // Checking if user already exists
//     User.find({ email })
//       .then((result) => {
//         if (result.length) {
//           // A user already exists
//           res.json({
//             status: "FAILED",
//             message: "User with the provided email already exists",
//           });
//         } else {
//           // Try to create new user

//           // password handling
//           const saltRounds = 10;
//           bcrypt
//             .hash(password, saltRounds)
//             .then((hashedPassword) => {
//               const newUser = new User({
//                 name,
//                 email,
//                 password: hashedPassword
//               });

//               newUser
//                 .save()
//                 .then((result) => {
//                   res.json({
//                     status: "SUCCESS",
//                     message: "Signup successful",
//                     data: result,
//                   });
//                 })
//                 .catch((err) => {
//                   res.json({
//                     status: "FAILED",
//                     message: "An error occurred while saving user account!",
//                   });
//                 });
//             })
//             .catch((err) => {
//               res.json({
//                 status: "FAILED",
//                 message: "An error occurred while hashing password!",
//               });
//             });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         res.json({
//           status: "FAILED",
//           message: "An error occurred while checking for existing user!",
//         });
//       });
//   }
// });

// Signin
// router.post("/signin", (req, res) => {
//   let { email, password } = req.body;
//   email = email.trim();
//   password = password.trim();

//   if (email == "" || password == "") {
//     res.json({
//       status: "FAILED",
//       message: "Empty credentials supplied",
//     });
//   } else {
//     // Check if user exist
//     User.find({ email })
//       .then((data) => {
//         if (data.length) {
//           // User exists

//           const hashedPassword = data[0].password;
//           bcrypt
//             .compare(password, hashedPassword)
//             .then((result) => {
//               if (result) {
//                 // Password match
//                 res.json({
//                   status: "SUCCESS",
//                   message: "Signin successful",
//                   value: data,
//                 });
//               } else {
//                 res.json({
//                   status: "FAILED",
//                   message: "Invalid password entered!",
//                 });
//               }
//             })
//             .catch((err) => {
//               res.json({
//                 status: "FAILED",
//                 message: "An error occurred while comparing passwords",
//               });
//             });
//         } else {
//           res.json({
//             status: "FAILED",
//             message: "Invalid credentials entered!",
//           });
//         }
//       })
//       .catch((err) => {
//         res.json({
//           status: "FAILED",
//           message: "An error occurred while checking for existing user",
//         });
//       });
//   }
// });

module.exports = {
  singUp,
};
