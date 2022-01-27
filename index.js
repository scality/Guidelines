module.exports = {
    extends: 'airbnb-base',

    env: {
        browser: false,
        node: true,
        mocha: true,
    },

    rules: {
        'strict': [2, 'global'],
        'indent': [2, 4],
        'no-mixed-spaces-and-tabs': 2,
        'max-len': [2, 120, 4],
        'quotes': [1, 'single', 'avoid-escape'],
        'semi': [2, 'always'],
        'curly': 1,
        'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
        'comma-dangle': 2,
        'camelcase': [2, { properties: 'always' }],
        'id-length': 0,
        'no-shadow': 0,
        'valid-jsdoc': 2,
        'eol-last': 2,
        'no-multiple-empty-lines': [2, { max: 2, maxEOF: 1 }],
        'no-console': 2,
        'object-shorthand': 2,
        'quote-props': [2, 'consistent-as-needed'],
        'prefer-template': 2,
        'array-bracket-spacing': [1, 'never'],
        'keyword-spacing': [1, {
            before: true,
            after: true,
            overrides: {
                return: { after: true },
                throw: { after: true },
                case: { after: true },
            },
        }],
        'linebreak-style': [1, 'unix'],
        'new-cap': [1, { newIsCap: true }],
        'space-in-parens': [1, 'never'],
        'consistent-return': 1,
        'prefer-arrow-callback': 1,
        'no-param-reassign': [1, { props: true }],
        'arrow-body-style': [1, 'as-needed'],
        'prefer-rest-params': 1,
        'no-unneeded-ternary': [1, { defaultAssignment: false }],
        'arrow-parens': [1, 'as-needed'],
        'no-return-assign': [1, 'always'],
        'prefer-const': 1,
        'array-callback-return': 1,
        'no-underscore-dangle': 0,
    },
};
