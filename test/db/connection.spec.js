const redis = require('../../src/repository/connection');
const { expect } = require('chai');

const testKey = 'test'
const testVal = 'redis: ok.'

describe('Redis Connection', () => {
	before('Ping', async () => {
		const res = await redis.PING()
		expect(res).to.string('PONG')
	});

	it('Set Value', async () => {
		const res = await redis.set(testKey, testVal)
		expect(res).to.string('OK')
	});

	it('Get Value', async () => {
		const res = await redis.get(testKey)
		expect(res).to.string(testVal)
	});

	after(async () => {
		const res = await redis.del(testKey)
		expect(res).equal(1)
	});

});