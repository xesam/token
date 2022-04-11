const assert = require('assert');
const Config = require('@xesam/config');
const cfg = new Config('token1.test.json5');
const {Token} = require('..');

const now = Date.now();

new Token({access_token: "init_token", expire: now + 10000}, cfg, {name: 'test_token'})
    .get()
    .then(token => {
        assert.deepEqual(token, {
            access_token: "init_token",
            expire: 1.7976931348623157e+308
        });
    });