
const emailTemplates = require('../templates')
const ForgotPassword = require('./forgotPassword')
const PasswordChanged = require('./passwordChanged')

const templateMapping = {
    [emailTemplates.PASSWORD_RESET_REQUEST]: ForgotPassword,
    [emailTemplates.PASSWORD_CHANGED]: PasswordChanged,
}

const generateHTML = (view, data) => {
    const View = templateMapping[view]
    let markup = new View(data).renderHTML() 
    markup = `<style> p{ margin:0; padding:0; } </style> ${markup}`

    return markup
}

module.exports = generateHTML