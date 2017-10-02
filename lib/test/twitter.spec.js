'use strict'

const expect = require('chai').expect;
const _ = require('lodash');

describe('test twitter client', () => {
    describe('test', () => {
        it('should return dependecies', () => {
            const twitter = require('../../services/twitter');
            return twitter.query("%23twitter")
                .then(function(res){
                    expect(res).to.not.be.empty;
                    expect(res[0].id_str).to.not.be.empty;
                    expect(res[0].created_at).to.not.be.empty;
                    expect(res[0].text).to.not.be.empty;
                    expect(res[0].user.name).to.not.be.empty;
                    expect(res[0].user.screen_name).to.not.be.empty;
                    expect(res[0].user.profile_image_url).to.not.be.empty;
                })
        })
    })
});