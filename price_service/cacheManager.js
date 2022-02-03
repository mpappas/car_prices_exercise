'use strict';

const redis = require('redis');
const { promisify } = require('util');
const { redisUrl } = require('./config/dev');

const redisClient = redis.createClient(redisUrl);

redisClient.connect();
console.log('Redis connected!');

redisClient.on('connected', () => console.log('Redis is connected'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));

setInterval(function () {
  console.log('Keeping alive - Node.js Performance Test with Redis');
  redisClient.set('ping', 'pong');
}, 1000 * 60 * 4);

global.cache = redisClient;
module.exports = redisClient;
