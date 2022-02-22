const Urls = require('../../src/repository/index');
const db = require('../../src/repository/connection');
const { expect } = require('chai');
const ShortLink = require('../../src/repository/short-link');

const fullUrl = 'https://redis.io/commands'
const genCode = ShortLink.genCode
const codes = ['1co2de3', '1co2de3', '1te2st3']
let uniqueCount = 0
ShortLink.genCode = async () => {
	return codes[uniqueCount++]
}

describe('Repository', () => {
	it('Insert Url (unique check)', async () => {
		let url = await Urls.insert(fullUrl)
		expect(url.code).string(codes[0])
		url = await Urls.insert(fullUrl)
		expect(url.code).string(codes[2])
		expect(uniqueCount).equal(3)
	});

	it('Insert Url', async () => {
		const full = fullUrl
		ShortLink.genCode = genCode
		const url = await Urls.insert(full)
		expect(url.fullUrl).equal(full)
	});
});