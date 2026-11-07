const eslintConfigPrettier = require('eslint-config-prettier/flat');
const base = require('./base');

const { rules } = base[0];
const [maxLenSeverity, code, tabWidth] = rules['max-len'];

module.exports = [
    ...base,
    eslintConfigPrettier,
    {
        rules: {
            'curly': rules.curly,
            'quotes': rules.quotes,
            'no-unexpected-multiline': rules['no-unexpected-multiline'],
            'max-len': [
                maxLenSeverity,
                {
                    code,
                    tabWidth,
                    // Prettier keeps a require of a single module on one line, and its path cannot be split
                    ignorePattern: '^\\s*(?:const|let|var)\\s.+=\\s*require\\s*\\(',
                },
            ],
            'no-useless-concat': 2,
            'no-multi-str': 2,
        },
    },
];
