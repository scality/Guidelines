'use strict';

function classify(code) {
    switch (code) {
        case 404:
            return 'missing';
        default:
            return 'other';
    }
}

const message =
    'The request signature we calculated does not match the signature you provided. ' +
    'Check your key and signing method.';

module.exports = { classify, message };
