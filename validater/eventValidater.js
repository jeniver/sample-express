const { body } = require("express-validator");

module.exports = {
  eventFormValidater: [
    body("created_temple")
      .exists()
      .withMessage("Temple Name is required")
      .trim(),
    body("expected_participants_count")
      .exists()
      .withMessage("Participation count is required")
      .trim()
      .isLength({ min: 1 })
      .withMessage("need to add more than 1"),
    ,
    body("user_id").exists().withMessage("user Id is required").trim(),
  ],
};
