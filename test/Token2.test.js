const assert = require('assert');
const Config = require('@xesam/config');
const cfg = new Config('token2.test.json5');
const {Token} = require('..');


new Token({access_token: "init_token", expire: Number.MAX_VALUE}, cfg, {name: 'test_token'})
    .get()
    .then(token => {
        assert.deepEqual(token, {
            access_token: "init_token",
            expire: Number.MAX_VALUE
        });
    });