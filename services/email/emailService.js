const providerFactory = require('./providers/factory')
const generateHTML = require('./views/generateHTML')

class EmailService {
    
    constructor() {
        this.providerType = process.env.MAIL_PROVIDER
        this._fromEmail = process.env.MAIL_FROM_ADDRESS
        this._fromName = process.env.MAIL_FROM_NAME
        this._html = true
    }

    providerType(pType) {
        this.providerType = pType
    }

    from(from) {
        this._from = from;
        return this;
    }

    fromName(name) {
        this._fromName = name;
    }

    fromEmail(email) {
        this._fromEmail = email;
    }

    to(recipients) {
        this._recipients = recipients;
        return this;
    }
    body(body, html = false) {
        this._body = body;
        this._html = html
        return this;
    }
    cc(cc) {
        this._cc = cc;
        return this;
    }
    subject(subject) {
        this._subject = subject;
        return this;
    }
    template(template, data = {}) {
        this._template = template
        this._templateData = data
        return this
    }
    _getBodyContent() {
        if(this._template) {
            let data = Object.assign({}, this._templateData, {emailService: this})
            return generateHTML(this._template, data) 
        }
        return this._body
    }
    async send() {
        if(!this._validate()) return Promise.reject(new Error('Email validation failed'));
        
        const provider = providerFactory.make(this.providerType, this)
        await provider.send()
    }
    _validate() {
        return true;
    }

}

module.exports = EmailService
