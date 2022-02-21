class Token {
    /**
     * initializer's return : {access_token, expires_in}
     * */
    constructor(config, initializer) {
        this.config = config;
        if (typeof initializer === 'function') {
            this.initializer = initializer;
        } else {
            this.initializer = () => {
                return Promise.resolve(initializer);
            }
        }
    }

    get() {
        const {access_token, modified, expires_in} = this.config.loadSync();
        if (access_token && modified + expires_in > Date.now()) {
            return Promise.resolve({
                access_token
            });
        } else {
            const modified = Date.now();
            return this.initializer()
                .then(({access_token, expires_in}) => {
                    return this.config.dump({
                        access_token,
                        expires_in,
                        modified
                    });
                });
        }
    }
}

module.exports = Token;