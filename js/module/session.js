import config from './config.js';

const session = {
    name: config.session,
    get: function (key = '') {
        let result = JSON.parse(
            sessionStorage[this.name] || '{}'
        );

        if (key) {
            result = result[key];
        }

        return result;
    },
    set: function (
        key = '',
        value
    ) {
        if (
            typeof key !== 'undefined' &&
            typeof value !== 'undefined'
        ) {
            let data = JSON.parse(
                sessionStorage[this.name] || '{}'
            );

            data[key] = value;
            sessionStorage[this.name] = JSON.stringify(data);
        }
    }
};

export default session;
