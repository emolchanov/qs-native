# qs-native
Lightweight querystring parse() &amp; stringify() based on URLSearchParams API

[![NodeJS Tests CI](https://github.com/emolchanov/qs-native/actions/workflows/node.js.yml/badge.svg)](https://github.com/emolchanov/qs-native/actions/workflows/node.js.yml)

## Instalation
`npm install qs-native`

## Using in IE11 and older
For using qs-native in IE11 and other browsers that doesn't support URLSearchParams API install `core-js` polyfill https://github.com/zloirock/core-js#url-and-urlsearchparams

[CoreJS - CommonJS entry points:](https://github.com/zloirock/core-js/blob/master/README.md#commonjs-api)
```js
core-js/proposals/url
core-js(-pure)/web/url
core-js(-pure)/web/url-search-params
core-js(-pure)/stable|features/url
core-js/stable|features/url/to-json
core-js(-pure)/stable|features/url-search-params
```

