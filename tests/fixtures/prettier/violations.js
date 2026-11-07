'use strict';

function check(value, callback) {
    if (!value) return callback(new Error('missing value'));
    return callback(null, `checked`);
}

const greeting = 'Hello, ' + 'world';

const legacy =
    'first line \
second line';

const description =
    'This message is far too long to fit within the one hundred and twenty columns allowed by the shared config, even once Prettier moves it to its own line';

module.exports = { check, greeting, legacy, description };
