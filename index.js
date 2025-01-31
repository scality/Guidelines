const globals = require('globals');

// Auto-detect plugin name, to avoid duplicate errors
const testPlugin = (() => {
    try {
        require.resolve('jest');
        return 'jest';
    } catch {
        return 'mocha';
    }
})();

module.exports = {
    globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
        ...globals.node,
    },
    plugins: ['jest', 'mocha'],
    extends: [
        `plugin:${testPlugin}/recommended`,
    ],
    rules: {
        'constructor-super': 'error',
        'for-direction': 'error',
        'getter-return': 'error',
        'no-async-promise-executor': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': 'error',
        'no-const-assign': 'error',
        'no-constant-binary-expression': 'error',
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-empty-static-block': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-import-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': 'error',
        'no-regex-spaces': 'error',
        'no-self-assign': 'error',
        'no-setter-return': 'error',
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-this-before-super': 'error',
        'no-undef': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-unused-labels': 'error',
        'no-unused-private-class-members': 'error',
        'no-unused-vars': 'error',
        'no-useless-backreference': 'error',
        'no-useless-catch': 'error',
        'no-useless-escape': 'error',
        'no-with': 'error',
        'require-yield': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'camelcase': [
            2,
            {
                properties: 'always'
            }
        ],
        'indent': [
            2,
            4
        ],
        'quotes': [
            1,
            'single',
            'avoid-escape'
        ],
        'semi': [
            2,
            'always'
        ],
        'curly': 1,
        'no-mixed-spaces-and-tabs': 2,
        'max-len': [
            2,
            120,
            4
        ],
        'space-before-function-paren': [
            2,
            {
                anonymous: 'always',
                named: 'never'
            }
        ],
        'id-length': 0,
        'no-shadow': 0,
        'eol-last': 2,
        'no-multiple-empty-lines': [
            2,
            {
                max: 2,
                maxEOF: 1
            }
        ],
        'no-console': 2,
        'object-shorthand': 2,
        'quote-props': [
            2,
            'consistent-as-needed'
        ],
        'prefer-template': 2,
        'array-bracket-spacing': [
            1,
            'never'
        ],
        'keyword-spacing': [
            1,
            {
                before: true,
                after: true,
                overrides: {
                    return: {
                        after: true
                    },
                    throw: {
                        after: true
                    },
                    case: {
                        after: true
                    }
                }
            }
        ],
        'linebreak-style': [
            1,
            'unix'
        ],
        'new-cap': [
            1,
            {
                newIsCap: true
            }
        ],
        'space-in-parens': [
            1,
            'never'
        ],
        'consistent-return': 1,
        'prefer-arrow-callback': 1,
        'no-param-reassign': [
            1,
            {
                props: true
            }
        ],
        'arrow-body-style': [
            1,
            'as-needed'
        ],
        'prefer-rest-params': 1,
        'no-unneeded-ternary': [
            1,
            {
                defaultAssignment: false
            }
        ],
        'arrow-parens': [
            1,
            'as-needed'
        ],
        'no-return-assign': [
            1,
            'always'
        ],
        'prefer-const': 1,
        'array-callback-return': 1,
        'no-underscore-dangle': 0,
    },
};
