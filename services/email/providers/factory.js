
const mapping = {
    SMTP: require("./smtpProvider"),
}

class Factory {
    static make(provider, emailService) {
        const providerCls = mapping[provider];
        if(!providerCls) throw new Error(`Could not find the email provider - ${provider}`);
        return new providerCls(emailService)
    }
}

module.exports = Factory