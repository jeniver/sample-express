const { body } = require('express-validator');

module.exports = {
  registerProfile: [
    body('name')
      .exists()
      .withMessage('name is required')
      .trim(),
    body('email')
      .exists()
      .withMessage('Email is required')
      .trim()
      .escape()
      .isEmail()
      .withMessage('Email is invalid')
      .isLength({ min: 1, max: 100 })
      .withMessage('Email length is invalid'),
    body('password')
      .exists()
      .withMessage('password is required')
      .trim()
      .isLength({ min:8 , max:10 })
      .withMessage('Password length is invalid'),
  ],

  forgetPassword:[ body('email').exists()
    .withMessage('Email is required')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email is invalid')]
};
