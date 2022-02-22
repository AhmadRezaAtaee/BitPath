const randomStr = require('../helpers/random-str')
const { SHORTENER_LENGTH } = process.env

class ShortLink {
    static genCode = async () => await randomStr(+SHORTENER_LENGTH || 5)
    constructor(url, code) {
        this.fullUrl = url
        this.code = code
    }
    views = 0
    createdAt = new Date(Date.now())
}

module.exports = ShortLink