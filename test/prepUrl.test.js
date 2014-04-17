'use strict';

var should = require('should');
var prepUrl = require('../url-builder').prepUrl;



describe('lib/prepUrl', function () {

  describe('when a token is already in the url', function () {
    var out = prepUrl('http://simon.com/:id', {
      id: '123'
    });
    it('should not be added to the query string', function () {
      out.should.equal('http://simon.com/:id');
    });
  });

  describe('when a single token is not in the url ', function () {
    var out = prepUrl('http://simon.com/:id', {
      pie: 'apple'
    });
    it('should add the single token to the url', function () {
      out.should.equal('http://simon.com/:id?pie=:pie');
    });
  });

  describe('if token is not listed in the url', function () {
    var out = prepUrl('http://simon.com/:id', {
      id: '123',
      query: '321',
      query2: '456'
    });

    it('should add it as a query parameter', function () {
      out.should.equal('http://simon.com/:id?query=:query&query2=:query2');
    });
  });


  describe('when given no tokens', function () {
    var out = prepUrl('http://simon.com/:id', null);
    it('should just return the url', function () {
      out.should.equal('http://simon.com/:id');
    });
  });

  describe('when given no url', function () {

    it('should throw a new error', function () {
      (function() {
        prepUrl(null, null);
      }).should.throw('No url provided.');
    });
  });


  describe('given a all the possible url prep tokens', function() {
    var url, tokens, out;
    before(function() {
      url = '/bacon';
      tokens = {
        page: 1,
        size: 1,
        sort: 1,
        order: 1,
        $id$: 1
      };
      out = prepUrl(url, tokens);
    });
    it('Should add tokens to the url string ready to be tokenise.',
      function() {
        var expected = '/bacon?page=:page&size=:size&sort=:sort' +
          '&order=:order&%24id%24=:%24id%24';
        should(out).equal(expected);
      }
    );
  });


  describe('given a token that already has the key in the list', function() {
    var url, tokens, out;
    before(function() {
      url = '/bacon?page=:page';
      tokens = {
        page: 1,
      };
      out = prepUrl(url, tokens);
    });
    it('Should add tokens to the url string ready to be tokenise.',
      function() {
        // could be seen as a bug but tokenise should be able to handle
        // this correctly.
        var expected = '/bacon?page=:page';
        should(out).equal(expected);
      }
    );
  });


  describe('given a token with an empty value', function () {
    var out;
    before(function() {

      var url = '/';
      var tokens = {
        bacon: ''
      };
      out = prepUrl(url, tokens);

    });

    it('should not add the token', function () {
      out.should.equal('/');
    });

  });

});





