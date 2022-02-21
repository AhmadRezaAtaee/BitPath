module.exports = class {
    constructor(url, code) {
        this.fullUrl = url
        this.shortUrl = code
        this.code = code
    }
    views = 0
    createdAt = Date.now()
}