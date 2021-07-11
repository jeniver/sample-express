const EventService = require("../services/eventService");

const addEvent = async (req, res, next) => {
  try {
    const {
      userId,
      destination,
      participantsCount,
      expectedParticipantsCount,
      requestData,
      message,
      temple,
      status,
      notificationType,
    } = req.body;
    const data = await EventService.addEvent(
      userId,
      destination,
      participantsCount,
      expectedParticipantsCount,
      requestData,
      message,
      temple,
      status,
      notificationType
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const fetchAllEvents = async (req, res, next) => {
  try {
    const response = await EventService.getAllEvents();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addEvent,
  fetchAllEvents
};
