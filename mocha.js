var assert = require("assert");

// describe() will create a big test to include every "it", which is smaller test
describe("My Test Suite", function(){
    it('should pass this test', function(){
        assert.equal(1, 1, "One equals one")
    })

    it("should not pass this", function(){
        assert.equal(2, 1, "One equals one")
    })
})

describe("My second Suite", function(){
    it('should match', function(){
        assert.match("Testing", /Test/, "Contain 'Test'")
    })

    it("should not match", function(){
        assert.match("Testing", /Tes/, "Contain 'Test'")
    })
})

