class AbsToken {
    /**
     * initializer's return : {access_token, expire}
     * */
    constructor(initializer) {
        if (typeof initializer === 'function') {
            this.initializer = initializer;
        } else {
            this.initializer = () => {
                return Promise.resolve(initializer);
            }
        }
    }

    _dumpToken(token) {
        throw Error('no implement of _dumpToken ' + JSON.stringify(token));
    }

    _loadToken() {
        throw Error('no implement of _loadToken')
    }

    get() {
        return this._loadToken().then(({access_token, expire}) => {
            if (access_token && expire > Date.now()) {
                return {access_token, expire};
            } else {
                return Promise.reject({});
            }
        }).catch(err => {
            return this.initializer().then(token => {
                this._dumpToken(token);
                return token;
            });
        });
    }
}

module.exports = AbsToken;