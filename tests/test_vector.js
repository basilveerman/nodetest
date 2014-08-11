var pdp = require('../pdp.js');

var chai = require('chai');
var expect = chai.expect;

describe("vector", function() {
    describe("test()", function() {
        it("Should greet you kindly", function() {
            var greeting = pdp.vector.test();
            expect(greeting).to.equal("i'm a vector");
        });
    });
});
