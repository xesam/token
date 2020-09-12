class Token {
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
        const { access_token, modified, expires_in } = this.config.loadSync();
        if (access_token && modified + expires_in > Date.now()) {
            return Promise.resolve({
                access_token
            });
        } else {
            return this.initializer()
                .then(({ access_token, expires_in }) => {
                    this.config.dumpSync({
                        access_token,
                        expires_in,
                        modified: Date.now()
                    });
                    return {
                        access_token: access_token
                    };
                });
        }
    }
}

module.exports = Token;