
const BaseView = require('./baseView')

class passwordChanged extends BaseView {
   
    renderHTML() {
        const { user } = this.data
        return `
            <div>
                Hi ${user.name},
                <p style="margin: 5px 0">You have successfully updated your password.</p>
            </div>
        `
    }
}

module.exports = passwordChanged

