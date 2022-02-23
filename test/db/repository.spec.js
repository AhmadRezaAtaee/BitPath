const Urls = require('../../src/repository/index');
const db = require('../../src/repository/connection');
const indexes = require('../../src/repository/db-index');
const { expect } = require('chai');
const ShortLink = require('../../src/repository/short-link');

const fullUrl = 'https://redis.io/commands'
const genCode = ShortLink.genCode
const codes = ['1co2de3', '1co2de3', '1te2st3']
let uniqueCount = 0
ShortLink.genCode = async () => {
	return codes[uniqueCount++]
}
const fullUrls = [
	'pc.io', 'node.net', 'google.com',
	'cats.shop', 'test.com', 'js.co',
]

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

	it('Get Url', async () => {
		expect(await Urls.get('123456')).null
		const url = await Urls.insert(fullUrl)
		expect((await Urls.get(url.code)).code).equal(url.code)
	});

	it('Get All Urls', async () => {
		ShortLink.genCode = genCode
		expect(await indexes.create()).string('OK')
		const codes = []
		for (let index = 0; index < fullUrls.length; index++) {
			const element = fullUrls[index];
			const shortLink = await Urls.insert(element)
			expect(shortLink.code).exist
			codes.push(shortLink.code)
		}
		expect(codes.length).equal(fullUrls.length)

		let find = await Urls.all({ search: 'co' })
		expect(find.total).equal(3)

		find = await Urls.all({ limit: 2, part: 0 })
		expect(find.documents.length).equal(2)
		expect(
			[find.documents[0].value.code, find.documents[1].value.code]
		).deep.equal([codes[0], codes[1]])

		find = await Urls.all({ sort: 'desc' })
		expect(find.documents.map(doc => doc.id)).deep.equal(codes.reverse())
	});

	it('Update Url Views', async () => {
		const url = await Urls.insert(fullUrl)
		expect(new Array(await Urls.updateViews(url.code)).flat()[0]).equal(1)
	});

	afterEach('Delete all keys', async () => {
		const clean = await db.FLUSHDB()
		expect(clean).equal('OK')
	});
});
