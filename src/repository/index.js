const client = require('./connection')
const repository = require('./repository')
const ShortLink = require('./short-link')
const indexes = require('./indexes')

module.exports = {
	client,
	ShortLink,
	indexes,
	...repository,
}