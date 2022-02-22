const { SchemaFieldTypes } = require("redis")
const db = require('./connection')

const indexName = 'urls'
const fields = {
	fullUrl: 'full-url',
	code: 'code',
	views: 'views',
	createdAt: 'created-at',
}

const create = () => {
	return db.ft.CREATE(indexName, {
		'$.fullUrl': {
			type: SchemaFieldTypes.TEXT,
			AS: fields.fullUrl
		},
		'$.code': {
			type: SchemaFieldTypes.TEXT,
			AS: fields.code
		},
		'$.views': {
			type: SchemaFieldTypes.NUMERIC,
			AS: fields.views
		},
		'$.createdAt': {
			type: SchemaFieldTypes.TEXT,
			AS: fields.createdAt
		}
	}, { ON: 'JSON' })
}

module.exports = { indexName, fields, create }