"use strict";

var pdp = require('../pdp.js');

var chai = require('chai');
var expect = chai.expect;

describe("raster", function() {
    describe("test()", function() {
        it("Should greet you kindly", function() {
            var greeting = pdp.raster.test();
            expect(greeting).to.equal("i'm a raster");
        });
    });
});
