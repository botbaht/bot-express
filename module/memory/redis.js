"use strict";

const debug = require("debug")("bot-express:memory");
const redis = require("redis");
const rejson = require("redis-rejson");
rejson(redis);
Promise = require("bluebird");
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

class MemoryRedis {
    constructor(options){
        this.client = redis.createClient(options);
    }

    get(key){
        return this.client.json_getAsync(key);
    }

    put(key, value, retention){
        return this.client.json_setAsync(key, value, 'EX', retention);
    }

    del(key){
        return this.client.json_delAsync(key);
    }
}

module.exports = MemoryRedis;
