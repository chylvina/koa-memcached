'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('koa:memcached');
var Memcached = require('node_memcached');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Initialize memcached session middleware with `opts`:
 *
 * @param {Object} options
 *   - {Object} client    memcached client
 *   - {String} host      connect host (with out options.client)
 *   - {Number} port      connect port (with out options.client)
 *   - {String} username
 *   - {String} password
 */
var MemcachedStore = module.exports = function (options) {
  if (!(this instanceof MemcachedStore)) {
    return new MemcachedStore(options);
  }
  EventEmitter.call(this);
  options = options || {};
  var client;

  if (!options.client) {
    debug('Init memcached with host: %s, port: %d',
      options.host || 'localhost', options.port || 11211);
    client = Memcached.createClient(options.port,
      options.host, options);
  }
  else {
    client = options.client;
  }

  //options.pass && client.auth(options.pass, function (err) {
  //  if (err) {
  //    throw err;
  //  }
  //});

  client.on('error', this.emit.bind(this, 'disconnect'));
  client.on('end', this.emit.bind(this, 'disconnect'));
  client.on('connect', this.emit.bind(this, 'connect'));

  this.client = client;
};

util.inherits(MemcachedStore, EventEmitter);

MemcachedStore.prototype.get = function *(sid) {
  var self = this;
  var data = yield function (cb) {
    self.client.get(sid, cb);
  };

  debug('get session: %s', data || 'none');
  if (!data) {
    return null;
  }
  try {
    return JSON.parse(data);
  }
  catch (err) {
    // ignore err
    debug('parse session error: %s', err.message);
  }
};

MemcachedStore.prototype.set = function *(sid, sess, ttl) {
  var self = this;
  if (typeof ttl === 'number') {
    ttl = ttl / 1000;
  }
  sess = JSON.stringify(sess);
  if (ttl) {
    debug('SETEX %s %s %s', sid, sess, ttl);
    yield function (cb) {
      self.client.set(sid, sess, ttl, cb);
    };
  } else {
    debug('SET %s %s', sid, sess);
    yield function (cb) {
      self.client.set(sid, sess, cb);
    };
  }
  debug('SET %s complete', sid);
};

MemcachedStore.prototype.destroy = function *(sid, sess) {
  var self = this;
  debug('DEL %s', sid);
  yield function (cb) {
    self.client.delete(sid, cb);
  };
  debug('DEL %s complete', sid);
};
