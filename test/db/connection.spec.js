const redis = require('../../src/repository/connection');
const { expect } = require('chai');

const testKey = 'test'
const testVal = 'redis: ok.'

describe('Redis Connection', () => {
	before(async () => {
		const res = await redis.set(testKey, testVal)
		expect(res).to.equal('OK')
	});

	it('Get Value', async () => {
		const res = await redis.get(testKey)
		expect(res).to.equal(testVal)
	});

	after(async () => {
		const res = await redis.del(testKey)
		expect(res).to.equal(1)
	});
	
});