const { expect } = require('chai');
const middlewares = require('../../src/middlewares')
const redirectRoute = require('../../src/routes/redirect')
const urlsRoute = require('../../src/routes/urls')
const app = require('express')()
middlewares.forEach(middleware => {
	app.use(middleware)
})
app.use(redirectRoute)
app.use(urlsRoute)
const request = require('supertest')(app)

describe('App - E2E', () => {
	it('', () => {

	});
});