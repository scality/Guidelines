const eslintConfigPrettier = require('eslint-config-prettier/flat');
const base = require('./base');

const { rules } = base[0];

module.exports = [
    ...base,
    eslintConfigPrettier,
    {
        rules: {
            'curly': rules.curly,
            'quotes': rules.quotes,
            'no-unexpected-multiline': rules['no-unexpected-multiline'],
            'max-len': rules['max-len'],
            'no-useless-concat': 2,
            'no-multi-str': 2,
        },
    },
];
