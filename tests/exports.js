'use strict';

const assert = require('assert');
const path = require('path');
const test = require('node:test');
const { ESLint } = require('eslint');

const root = path.join(__dirname, '..');

test('the package entry points resolve', () => {
    for (const [specifier, file] of [
        ['eslint-config-scality', 'index.js'],
        ['eslint-config-scality/prettier.config.cjs', 'prettier.config.cjs'],
        ['eslint-config-scality/package.json', 'package.json'],
    ]) {
        assert.strictEqual(require.resolve(specifier), path.join(root, file));
    }
});

test('the ESLint config can be spread in a flat config', async () => {
    const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: [...require('eslint-config-scality')] });
    const [result] = await eslint.lintText('const a = 1;\nmodule.exports = { a };\n', { filePath: 'sample.js' });
    assert.deepStrictEqual(result.messages, []);
});
