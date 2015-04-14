
var app = require('./config.js');
var expect = require('chai').expect;
var request = require('supertest');

before(function(done) {
  var data = {body: require('../data/testData.json')};
  require('./database/people/controller').post(data, {send: function() {}});
  done();
});

describe('Routing Tests', function() {
  describe('Client Routes', function() {
    it('should return 200', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });

    it('should serve up the client', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .end(done);
    });

    it('should redirect to home on invalid URL', function(done) {
      request(app)
        .get('/invalidURL')
        .expect(302)
        .end(function(err, res) {
          expect(res.text).to.equal('Moved Temporarily. Redirecting to /');
          done();
        });
    });
  });

  describe('API Routes', function() {
    describe('People API', function() {
      it("should return Not Found if requested person doesn't exist", function(done) {
        request(app)
          .get('/api/people/Garrett Cox')
          .expect('Garrett Cox Not found')
          .end(done);
      });

      it('should return the requested person if they exist', function(done) {
        request(app)
          .get('/api/people/Justin Bieber')
          .end(function(err, res) {
            var person = JSON.parse(res.text);
            expect(person.fullName).to.be.ok;
            expect(person.score).to.exist;
            done();
          });
      });

      it('should return the users associated data in each table', function(done) {
        request(app)
          .get('/api/people/Justin Bieber')
          .end(function(err, res) {
            var person = JSON.parse(res.text);
            if (person.twitter) expect(person.twitter.fullName).to.equal(person.fullName);
            if (person.context) expect(person.context.fullName).to.equal(person.fullName);
            if (person.facebook) expect(person.facebook.fullName).to.equal(person.fullName);
            if (person.top) expect(person.top.fullName).to.equal(person.fullName);
            if (person.sites) expect(person.sites.fullName).to.equal(person.fullName);
            done();
          });
      });

      it('should be able to store data in people and associated tables', function(done) {
        var personObj = { fullName: 'Lest Account', context: {occupation: 'myJob' }};
        request(app)
           .post('/api/people')
           .send(personObj)
           .end(function(err, res) {
             expect(res.text).to.not.equal('Invalid POST');
             done();
           });
      });

      it("shouldn't work if the data doesn't contain a fullName property", function(done) {
        var personObj = {context: {occupation: 'myJob'}};
        request(app)
          .post('/api/people')
          .send(personObj)
          .end(function(err, res) {
            expect(res.text).to.equal('Invalid POST');
            done();
          });
      });

      it('should be able to accept an array of people objects', function(done) {
        var g = {fullName: 'Garrett'};
        var j = {fullName: 'Joel'};
        var c = {fullName: 'Carter'};
        var people = [g, j, c];
        request(app)
          .post('/api/people')
          .send({people:people})
          .end(function(err, res) {
            expect(res.text).to.not.equal('Invalid POST');
            done();
          });
      });
    });

    xdescribe('Top API', function() {
      it('should return the requested list', function(done) {
        request(app)
          .get('/api/top/a')
          .end(function(err, res) {
            var list = JSON.parse(res.text);
            expect(list).to.be.an('array');
            expect(list[0].rank).to.equal(1);
            done();
          });
      });

      it('should return all lists on the default route', function(done) {
        request(app)
          .get('/api/top')
          .end(function(err, res) {
            var top = JSON.parse(res.text);
            expect(top).to.be.an('object');
            expect(Object.keys(top)).to.eql(['a', 'b', 'c', 'd']);
            done();
          });
      });

      it('should return lists that contain 50 people each', function(done) {
        request(app)
          .get('/api/top')
          .end(function(err, res) {
            var top = JSON.parse(res.text);
            expect(top.a).to.have.lengthOf(50);
            expect(top.b).to.have.lengthOf(50);
            expect(top.c).to.have.lengthOf(50);
            expect(top.d).to.have.lengthOf(50);
            done();
          });
      });

      it('should default to all lists when an invalid list is requested', function(done) {
        request(app)
          .get('/api/top/wronglist')
          .end(function(err, res) {
            var top = JSON.parse(res.text);
            expect(top).to.be.an('object');
            expect(top).to.have.all.keys(['a', 'b', 'c', 'd']);
            done();
          });
      });

      it('should be able to return a single array containing the top 200', function(done) {
        request(app)
          .get('/api/top/all')
          .end(function(err, res) {
            var top = JSON.parse(res.text);
            expect(top).to.be.an('array');
            expect(top).to.have.lengthOf(200);
            done();
          });
      });
    });

    describe('Other APIs', function() {
      describe('Twitter API', function() {
        it('should be able to return data for a valid user', function(done) {
          request(app)
            .get('/api/twitter/Justin Bieber')
            .end(function(err, res) {
              var result = JSON.parse(res.text);
              expect(result).to.contain.all.keys(['handle', 'followers', 'fullName']);
              done();
            });
        });

        it("should return Not Found if requested person doesn't exist", function(done) {
          request(app)
            .get('/api/twitter/Garrett Cox')
            .expect('Garrett Cox Not found')
            .end(done);
        });
      });

      describe('Context API', function() {
        it('should be able to return data for a valid user', function(done) {
          request(app)
            .get('/api/context/Justin Bieber')
            .end(function(err, res) {
              var result = JSON.parse(res.text);
              expect(result).to.contain.all.keys(['dob', 'occupation', 'fullName']);
              done();
            });
        });

        it("should return Not Found if requested person doesn't exist", function(done) {
          request(app)
            .get('/api/context/Garrett Cox')
            .expect('Garrett Cox Not found')
            .end(done);
        });
      });

      describe('Sites API', function() {
        it('should be able to return data for a valid user', function(done) {
          request(app)
            .get('/api/sites/Justin Bieber')
            .end(function(err, res) {
              var result = JSON.parse(res.text);
              expect(result).to.contain.all.keys(['count', 'fullName']);
              done();
            });
        });

        it("should return Not Found if requested person doesn't exist", function(done) {
          request(app)
            .get('/api/sites/Garrett Cox')
            .expect('Garrett Cox Not found')
            .end(done);
        });
      });

      xdescribe('Facebook API', function() {
        it('should be able to return data for a valid user', function(done) {
          request(app)
            .get('/api/facebook/Justin Bieber')
            .end(function(err, res) {
              var result = JSON.parse(res.text);
              expect(result).to.contain.all.keys(['pages', 'likes', 'fullName']);
              done();
            });
        });

        it("should return Not Found if requested person doesn't exist", function(done) {
          request(app)
            .get('/api/facebook/Garrett Cox')
            .expect('Garrett Cox Not found')
            .end(done);
        });
      });
    });
  });
});

describe('Database Tests', function() {

});
