'use strict';
const isEqual = require('../isEqual');
require('chai').should();
describe('isEqual', function(){
  it('should give right answer for equal and unequal inputs', function(){
    const equalInputs = [
      [1,1],
      [true, true],
      ['foo', 'foo']
    ];
    equalInputs.forEach(function(input){
      const answer = isEqual(input[0], input[1]);
      answer.should.be.true;
    });
    const unequalInputs = [
      ['1',1],
      [1, 2],
      [1, true]
    ];
    unequalInputs.forEach(function(input){
      const answer = isEqual(input[0], input[1]);
      answer.should.be.false;
    });
  });
});