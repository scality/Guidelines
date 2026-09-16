#!/usr/bin/env node
const files = process.argv.slice(2);

// See rules at https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md
const config = {
    MD004: false, // Unordered list style
    MD007: false, // Unordered list indentation
    MD024: false, // Multiple headers with the same content
    MD027: false, // Multiple spaces after blockquote symbol
    MD029: { style: 'ordered' }, // Ordered list item prefix
    MD034: false, // Bare URL used
    MD040: false, // Fenced code blocks should have a language specified
    MD059: false, // Link text should be descriptive
};

// markdownlint is ESM-only: importing it dynamically keeps this script
// CommonJS and runs on Node versions without require(esm).
(async () => {
    const { lint } = await import('markdownlint/sync');
    const errors = lint({ files, config }).toString();
    if (errors) {
        process.stderr.write(`${errors}\n`);
        process.exit(1);
    }
})();
