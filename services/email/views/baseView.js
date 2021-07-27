
class BaseView {
    constructor(data) {
        this.data = data
    }

    renderHTML() {
        throw new Error('Process is not implemented')
    }
}

module.exports = BaseView