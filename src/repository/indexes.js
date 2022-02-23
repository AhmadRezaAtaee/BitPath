const { SchemaFieldTypes } = require("redis")
const db = require('./connection')

const indexName = 'urls'
const fields = {
	fullUrl: 'fullUrl',
	code: 'code',
	views: 'views',
	createdAt: 'createdAt',
}

const create = async () => {
	const idxList = await db.ft._LIST()
	if (idxList.includes(indexName)) {
		return;
	}
	return db.ft.CREATE(indexName, {
		'$.fullUrl': {
			type: SchemaFieldTypes.TEXT,
			AS: fields.fullUrl,
		},
		'$.code': {
			type: SchemaFieldTypes.TEXT,
			AS: fields.code
		},
		'$.views': {
			type: SchemaFieldTypes.NUMERIC,
			AS: fields.views,
			SORTABLE: true
		},
		'$.createdAt': {
			type: SchemaFieldTypes.TEXT,
			AS: fields.createdAt,
			SORTABLE: true
		}
	}, { ON: 'JSON' })
}

module.exports = { indexName, fields, create }