// utils/helpers.js
const uuid = require('uuid');

const helpers = {
    generateToken: () => {
        return uuid.v4();
    },
};

module.exports = helpers;
