'use strict';

const LongModuleName = require('../../../../some/deeply/nested/directory/hierarchy/of/the/project/that/goes/on/LongModuleName');

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

module.exports = { LongModuleName, classify, message };
