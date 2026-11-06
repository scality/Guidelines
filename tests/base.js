'use strict';

const assert = require('assert');
const path = require('path');

const base = require('../base');
const legacy = require('../index');

assert.strictEqual(base.length, 1);
assert.deepStrictEqual(legacy, {
    globals: base[0].languageOptions.globals,
    rules: base[0].rules,
});

const root = path.join(__dirname, '..');
for (const [specifier, file] of [
    ['eslint-config-scality', 'index.js'],
    ['eslint-config-scality/base', 'base.js'],
    ['eslint-config-scality/prettier.config.cjs', 'prettier.config.cjs'],
    ['eslint-config-scality/package.json', 'package.json'],
]) {
    assert.strictEqual(require.resolve(specifier), path.join(root, file));
}
