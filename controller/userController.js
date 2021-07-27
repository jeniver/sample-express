
const UserService = require("../services/userServices");

const singUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await UserService.singUp(name, email, password);
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const singIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await UserService.singIn( email, password);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

  const getUserInfo = async (req, res, next) => {
    try {
      const { userid } = req.body;
      const data = await UserService.getUserInfo(userid);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

  const sendPasswordReset = async (req, res, next) => {
    try {
      const { email } = req.body;
      const data = await UserService.getUserInfo(email);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

module.exports = {
  singUp,
  singIn,
  getUserInfo,
  sendPasswordReset
};