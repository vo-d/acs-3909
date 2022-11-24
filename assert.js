const assert = require('assert');

assert.equal(1, 1, "one equals one")

assert.match("testing", /test/, "test is in testing")

assert.throws(function(){
    throw new Error("my error message")
}, function(err){
    return (err instanceof Error) && (err.message == "My error message")
})