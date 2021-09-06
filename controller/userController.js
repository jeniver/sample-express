
const UserService = require("../services/userServices");

const singUp = async (req, res, next) => {
  console.log("SignUp")
  console.log(req.body)
  try {
    const { name, email, password , phoneNo } = req.body;
    const data = await UserService.singUp(name, email, password , phoneNo);
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const singIn = async (req, res, next) => {
  console.log("signIN")
  console.log(req.body)
    try {
      const { email, password } = req.body;
      const data = await UserService.singIn( email, password);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error)
      return next(error);
    }
  };

  const getUserInfo = async (req, res, next) => {
    try {
      // const { userid } = req.body;
      const userid="6133bb240b8c194e8003f918"
      const data = await UserService.getUserInfo(userid);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

  const getAllUsers = async (req , res , next) => {
    try {
      const data = await UserService.getAllUsers();
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  }

  const sendPasswordReset = async (req, res, next) => {
    try {
      const { email } = req.body;
      const data = await UserService.getUserInfo(email);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

  
const editUsers = async (req, res, next) => {
  console.log("editUsers")
  const obj=JSON.parse(req.body.data)
  console.log(obj)
  console.log(req.files)
  try {
    const {
      userName, 
      email, 
      mobile
    } = JSON.parse(req.body.data);
    const profile_Pic = req.files;
    const data = await UserService.UpdateUsers(
      userName, 
      email,  
      mobile,
      profile_Pic
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const addUser = async (req, res, next) => {
  console.log("add Users userControllers")
  const obj=JSON.parse(req.body.data)
  console.log(obj)
  console.log(req.files)
  try {
    const {
      userName, 
      email, 
      address,
      phoneNumber,
      password
    } = JSON.parse(req.body.data);
    const pro_img= req.files;
    const user_level="ADMIN"
    const data = await UserService.AddUser(
      userName, 
      user_level,
      email,  
      address,
      password,
      phoneNumber,
      pro_img
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  singUp,
  singIn,
  getUserInfo,
  sendPasswordReset,
  getAllUsers,
  editUsers,
  addUser
};