// Scality baseline Prettier configuration.
// This is designed to align with the rules exported by `eslint-config-scality`
// in `index.js` (4-space indent, max line length 120, single quotes, semicolons).
//
// Recommended usage in a consuming project:
//   1. Install Prettier as a dev dependency:
//        yarn add --dev prettier
//      or: npm install --save-dev prettier
//   2. Copy or extend this config in your project:
//        // prettier.config.cjs
//        module.exports = require('eslint-config-scality/prettier');
//      (once this package exposes such an entry point)
//   3. Add scripts such as:
//        "format": "prettier --write .",
//        "format:check": "prettier --check ."
//
// Projects are free to override any option (for example, `tabWidth` or
// `printWidth`) if local constraints require it, but this file should serve
// as the common baseline.

module.exports = {
    // Match `indent: [2, 4]`
    tabWidth: 4,
    useTabs: false,

    // Match `max-len: [2, 120, 4]`
    printWidth: 120,

    // Match `quotes: [1, 'single', 'avoid-escape']`
    singleQuote: true,

    // Match `semi: [2, 'always']`
    semi: true,

    // Closest match to `comma-dangle: 2` (require dangling commas where valid)
    trailingComma: 'all',

    // ESLint uses `arrow-parens: [1, 'as-needed']`
    arrowParens: 'avoid',

    // Keep object spacing conventional and readable
    bracketSpacing: true,

    // Normalise line endings across platforms while avoiding noisy diffs
    endOfLine: 'lf',
};

