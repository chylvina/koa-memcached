koa-memcached [![Build Status](https://secure.travis-ci.org/chylvina/koa-memcached.svg)](http://travis-ci.org/chylvina/koa-memcached) [![Dependency Status](https://gemnasium.com/chylvina/koa-memcached.svg)](https://gemnasium.com/chylvina/koa-memcached)
=============

Memcached storage for koa session middleware / cache.

[![NPM](https://nodei.co/npm/koa-memcached.svg?downloads=true)](https://nodei.co/npm/koa-memcached/)

## Usage

`koa-memcached` works with [koa-generic-session](https://github.com/koajs/generic-session)(a generic session middleware for koa).

### Example

```javascript
var koa = require('koa');
var http = require('http');
var session = require('koa-generic-session');
var MemcachedStore = require('koa-memcached');

var app = koa();

app.name = 'koa-session-test';
app.keys = ['keys', 'keykeys'];

app.use(session({
  store: MemcachedStore()
}));

app.use(function *() {
  this.session.name = 'koa-memcached';
  this.body = this.session.name;
});

var app = module.exports = http.createServer(app.callback());
app.listen(8080);
```

### Options

```
 * {Object} client    memcached client
 * {String} host      memcached connect host (without options.client)
 * {Number} port      memcached connect port (without options.client)
 * {String} username  username
 * {String} password  password
```

## Authors

```
$ git summary

 project  : koa-memcached
 repo age : 7 months
 active   : 3 days
 commits  : 6
 files    : 6
 authors  :
     4  xiongliang.xl  66.7%
     1  Jackson Tian   16.7%
     1  chylvina       16.7%
```

## Licences
(The MIT License)

Copyright (c) 2015 chylvina@gmail.com and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
