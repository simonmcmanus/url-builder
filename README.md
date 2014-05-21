#URL Builder

Build and prepare URLs for use with Express and Restify routing.

[![Build Status](https://travis-ci.org/simonmcmanus/url-builder.svg?branch=master)](https://travis-ci.org/simonmcmanus/url-builder)


This module exposes two functions:


##prepUrl(url, tokens, prepUrl)


Given a URL in the Express/Restify format replace the tokens with the values provided in the tokens object.


The third param (prepUrl) defaults to false but if set to true will pass the URL to the prepUrl function before before it is tokenised.



##tokenise()


Given a URL and tokens object if the key from the tokens object does not already exist in the URL add a new token to the query string, eg:

url: /fruit/:id

params: {
  id: 123,
  page: 3
}

Prep url would change the url to:


/fruit/:id?page=:page

and then prepUrl would turn that into:


/fruit/123?page=3
