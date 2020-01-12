'use strict'

/**
 * If the list of params are in the tokens object it automatically adds them to
 * the url so they dont need to be specified for each route.
 * @param  {String} url    url string.
 * @param  {Object} tokens object containing values to be used in token
 *                           replacement.
 * @return {String}        Modified url string.
 */
exports.prepUrl = function(url, tokens) {
  function addToken(url, token) {
    if (tokens[token] === '') {
      return url
    }
    const separator = url.indexOf('?') === -1 ? '?' : '&'
    const key = encodeURIComponent(token)
    token = ':' + encodeURIComponent(token)
    return url + separator + key + '=' + token
  }

  if (!url) {
    throw new Error('No url provided.')
  }
  if (!tokens) {
    return url
  }
  for (let token in tokens) {
    if (tokens[token] instanceof Array) {
      //- multiple values for the same field.
      for (let a = 0; a < tokens[token].length; a++) {
        url = addToken(url, token)
      }
    } else {
      // should be an array,  think multi check boxes
      if (url.indexOf(':' + token) === -1) {
        url = addToken(url, token)
      }
    }
  }
  return url
}

/**
 * Tokenise a url.
 * @param  {String} url    The url to be tokenised, eg:
 *                                         '/asset/:id?query=:query'
 * @param  {Object} tokens The token to be placed into the url, tokens.token
 *                                         does not need to be passed in.
 * @param  {String} prepUrl    Should the url be prepped- boolean
 * @return {String}        The tokenised url.
 */
exports.tokenise = function(url, tokens, prepUrl) {
  function doReplace(url, token, value) {
    // let regex = new RegExp(':' + encodeURIComponent(token), 'g');
    // dont think we need the global flag any more.
    const regex = new RegExp(':' + encodeURIComponent(token))
    return url.replace(regex, encodeURI(value))
  }

  if (prepUrl) {
    url = exports.prepUrl(url, tokens)
  }

  for (let token in tokens) {
    if (tokens[token] instanceof Array) {
      for (let item in tokens[token]) {
        url = doReplace(url, token, tokens[token][item])
      }
    } else {
      url = doReplace(url, token, tokens[token])
    }
  }
  return url
}
