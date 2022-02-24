const { expect } = require('chai');
const middlewares = require('../../src/middlewares')
const redirectRoute = require('../../src/routes/redirect')
const urlsRoute = require('../../src/routes/urls')
const { indexes, client } = require('../../src/repository')
const app = require('express')()
middlewares.forEach(middleware => {
	app.use(middleware)
})
app.use(redirectRoute)
app.use(urlsRoute)
const request = require('supertest')(app)
const api = '/api/urls/'

describe('App - E2E', () => {
	before(async () => {
		expect(await indexes.create()).string('OK')
	});

	it('Create Short Url', async () => {
		const res = await request.post(api).send({ url: 'test.com' })
		expect(res.body.views).equal(0)
	});

	after(async () => {
		expect(await client.FLUSHDB()).string('OK')
	});
});