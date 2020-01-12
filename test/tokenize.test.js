'use strict'

const should = require('should')
const tokenise = require('../url-builder').tokenise

describe('lib/tokenise', function() {
  // needs to refactoring to take into account prep url parameter.

  describe('given a token and url', function() {
    const out = tokenise('http://simon.com/:id', {
      id: '123'
    })

    it('should add replace the token in the url with the value from the tokens object', function() {
      out.should.equal('http://simon.com/123')
    })
  })

  describe('given a url containing multiple tokens', function() {
    let url, tokens, out

    before(function() {
      url = '/bacon/:bag1?bag2=:bag2&bag3=:bag3'
      tokens = {
        bag1: 1,
        bag2: 2,
        bag3: 3
      }
      out = tokenise(url, tokens)
    })

    it('should update the token in both places', function() {
      should(out).equal('/bacon/1?bag2=2&bag3=3')
    })
  })

  describe('given multiple tokens and a url', function() {
    const out = tokenise('http://simon.com/:id/:token2', {
      id: 'a123',
      token2: '321'
    })
    it('should replace both tokens with the right value from the tokens object', function() {
      out.should.equal('http://simon.com/a123/321')
    })
  })

  describe('given $id$ token', function() {
    let url, tokens, out
    before(function() {
      url = '/bacon/'
      tokens = {
        $id$: 123
      }
      out = tokenise(url, tokens, true)
    })
    it('should update the token in both places', function() {
      should(out).equal('/bacon/?%24id%24=123')
    })
  })

  describe('given an array of items', function() {
    const out = tokenise(
      'http://simon.com/',
      {
        types: ['txt', 'js', 'fml']
      },
      true
    )
    it('should add the variable three times in the url', function() {
      out.should.equal('http://simon.com/?types=txt&types=js&types=fml')
    })
  })

  describe('given multiple tokens and a url one of which is not in the url', function() {
    const out = tokenise(
      'http://simon.com/:id/:token2',
      {
        id: 'a123',
        token2: '321',
        bacon: true
      },
      true
    )
    it('should replace both tokens with the right value from the tokens object', function() {
      out.should.equal('http://simon.com/a123/321?bacon=true')
    })
  })
})
