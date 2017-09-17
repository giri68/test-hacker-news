'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const { app } = require('../server');

chai.use(chaiHttp);

function seedData() {
  // ADD SEED DATA
}

describe('Hacker News API', function () {
  
  before(function () {

  });
  
  beforeEach(function () {
    return seedData();
  });

  afterEach(function () {
    return knex('news').del();
  });
  
  after(function () {

  });

  describe('Starter Test Suite', function () {
    
    it('should be true', function () {
      true.should.be.true;
    });
    
  });

}); 