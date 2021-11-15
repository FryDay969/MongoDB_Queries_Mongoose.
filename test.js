
const assert = require('assert');
const request = require('request');
const expect = require('chai').expect;

require('dotenv').config()

const URL = 'http://localhost:3000';

describe('API routes test', () => {
    describe('Should send phones from db', () => {
        const url = URL + '/';
        it('Should return 200', () => {
            request(url, (err, response, body) => {
                assert.equal(response.statusCode, 200);
            });
        })
    });
    describe('/phones route', () => {
        const url = URL + '/phones';
        it('Should add new user to db', (done) => {
            request(url, (err, response, body) => {
                const res = JSON.parse(body)
                console.log(res[0].name)
                console.log(res[0].model)
                expect(res[0]).have.property('name').to.equal('Xiaomi')
                expect(res[0]).have.property('model').to.equal('MI 11')
                done();
            });
        })
    });
});