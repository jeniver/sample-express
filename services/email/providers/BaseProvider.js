class BaseProvider {
    
    constructor(emailService) {
        this.emailService = emailService
    }

    send() {
        throw new Error('Process is not implemented')
    }
}

module.exports = BaseProvider