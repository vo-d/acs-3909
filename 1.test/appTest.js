const assert = require('chai').assert;
const {sayHello} = require('../1.app_Test');
const {addnumber} = require('../1.app_Test');

describe("App", ()=>{
    it ('app should return hello', ()=>{
        let result = sayHello();
        assert.equal(result, 'hello')
    })
    it('sayHello should return type string', ()=>{
        let result = sayHello();
        assert.typeOf(result, 'string')
    })

    it('addnumber should be above 5', ()=>{
        let result = addnumber(5, 5);
        assert.isAbove(result, 5)
    })

    it('addnumber should return type number', ()=>{
        let result = addnumber(5, 5);
        assert.typeOf(result, 'number')
    })
})