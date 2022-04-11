const assert = require('assert');

const {AbsToken} = require('..');

class TestToken extends AbsToken {
    _dumpToken(token) {
        return Promise.resolve(token);
    }

    _loadToken() {
        return Promise.resolve({});
    }
}

const now = Date.now();

new TestToken({access_token: "init_token", expire: now + 10000})
    .get()
    .then(token => {
        assert.deepEqual(token, {access_token: "init_token", expire: now + 10000});
    });