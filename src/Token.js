const AbsToken = require('./AbsToken');

class Token extends AbsToken {
    constructor(initializer, storage, opts = {name: null}) {
        super(initializer);
        this._storage = storage;
        this._name = opts.name;
    }

    _dumpToken(token) {
        return this._storage.dump(token, this._name);
    }

    _loadToken() {
        return this._storage.load(this._name);
    }
}

module.exports = Token;