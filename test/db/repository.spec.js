const Urls = require('../../src/repository/index');
const { expect } = require('chai');

describe('Redis Connection', () => {
	it('Insert Url', () => Urls.insert);
	it('Get Url', () => Urls.get);
	it('Get All Urls', () => Urls.all);
	it('Update Url Views', () => Urls.updateViews);
});