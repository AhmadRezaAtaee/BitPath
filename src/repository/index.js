const db = require('./connection');
const ShortLink = require('./short-link')

/**
 // function for insert url and record in urls table from db
 * @param {String} fullUrl - full url from request body for shortened 
 * @param {Number} codeUrlLength - random code and string length for url as shortened, defaul is 5
 * @return {Object} - this function return row or record object inserted
 */
const insert = async (fullUrl) => {
    const random = await ShortLink.genCode();
    const exists = await db.json.get(random);
    if (exists) {
        return insert(fullUrl);
    }
    const shortLink = new ShortLink(fullUrl, random);
    db.json.set(random, '.', shortLink);
    return db.json.get(random);
}

/**
 * function for get rows or record from urls table in db by url id or short code
 * @param {Number|String} codeId - url code (unique string) or url id for get row
 * @return {Object} - this function return row or record object inserted
 */
const get = async (code) => {
    return await db.json.get(code);
}

/**
 * function for get rows or record from urls table in db by url code
 * @param {Number} urlCode - url id for get row
 * @return {Object} - this function return object as changes result
 */
const updateViews = async (code) => {
    return await db.json.NUMINCRBY(code, '$.views', 1)
}

module.exports = {
    insert,
    get,
    updateViews,
};