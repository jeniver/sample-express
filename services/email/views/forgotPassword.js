
const BaseView = require('./baseView')

class ForgotPassword extends BaseView {
   
    renderHTML() {
        const {user, resetLink} = this.data
        return `
            <div>
                Hi ${user.name},
                <p style="margin: 5px 0">Please use the following link to reset your password</p>
                <a style="padding: 2px 6px; background: rgb(87, 131, 230); color:white; text-decoration: none" href='${resetLink}'>Reset password</a> 
            </div>
        `
    }
}

module.exports = ForgotPassword

