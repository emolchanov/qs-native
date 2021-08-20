# qs-native

Lightweight querystring parse &amp; stringify based on URLSearchParams API

`npm install qs-native` 

[![npm](https://img.shields.io/npm/v/qs-native?label=Latest)](https://www.npmjs.com/package/qs-native)
[![Coverage Status](https://coveralls.io/repos/github/emolchanov/qs-native/badge.svg?branch=main)](https://coveralls.io/github/emolchanov/qs-native?branch=main)
[![CodeQL](https://github.com/emolchanov/qs-native/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/emolchanov/qs-native/actions/workflows/codeql-analysis.yml)
[![NodeJS Tests CI](https://github.com/emolchanov/qs-native/actions/workflows/node.js.yml/badge.svg)](https://github.com/emolchanov/qs-native/actions/workflows/node.js.yml)
[![Test Coveralls](https://github.com/emolchanov/qs-native/actions/workflows/coveralls.yml/badge.svg)](https://github.com/emolchanov/qs-native/actions/workflows/coveralls.yml)


## Using
```js
import qs from 'qs-native';

qs.parse("?a=b&c=d");
//=> { a: "b", c: "d" }

qs.stringify({ a: "b", c: "d" });
//=> "a=b&c=d"
```

### Parsing options

strictNullHandling: boolean - optional
```js
qs.parse("?a=b&c", { strictNullHandling: true });
//=> { a: "b", c: null }
```

### Stringify options

skipNulls: boolean - optional
```js
qs.stringify({ a: "b", c: null }, { skipNulls: true });
//=> "a=b"
```

addQueryPrefix: boolean - optional
```js
qs.stringify({ a: "b", c: "d" }, { addQueryPrefix: true });
//=> "?a=b"
```

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

