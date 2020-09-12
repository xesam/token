class Token {
    constructor(config) {
        this.config = config;
    }

    init() {
        throw new Error('no impl');
    }

    get() {
        const { access_token, modified, expires } = this.config.loadSync();
        if (access_token && modified + expires > Date.now()) {
            return Promise.resolve({
                access_token
            });
        } else {
            return this.init().then(({ access_token, expires }) => {
                config.dump({
                    access_token,
                    expires,
                    modified: Date.now()
                });
                return {
                    access_token: access_token
                };
            });
        }
    }
}