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

module.exports = {
    insert,
};