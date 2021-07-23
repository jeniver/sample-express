const notifiCationService = require("../services/notificationService");


const notification = async (req, res, next) => {
    try {
      const {userid } = req.body;
      const data = await notifiCationService.getNotification(userid);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };


  module.exports = {
    notification
  }