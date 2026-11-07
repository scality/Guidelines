'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const test = require('node:test');
const { ESLint } = require('eslint');
const prettier = require('prettier');

const fixtures = path.join(__dirname, 'fixtures', 'prettier');

async function lintFormatted(name) {
    const file = path.join(fixtures, name);
    const options = await prettier.resolveConfig(file);
    const code = await prettier.format(fs.readFileSync(file, 'utf8'), { ...options, filepath: file });
    const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: require('../prettier') });
    const [result] = await eslint.lintText(code, { filePath: file });
    return result.messages;
}

test('code formatted by Prettier passes the Prettier ESLint config', async () => {
    assert.deepStrictEqual(await lintFormatted('clean.js'), []);
});

test('the Prettier ESLint config still reports what Prettier leaves in place', async () => {
    const ruleIds = (await lintFormatted('violations.js')).map(message => message.ruleId);
    assert.deepStrictEqual(ruleIds.sort(), ['curly', 'max-len', 'no-multi-str', 'no-useless-concat', 'quotes']);
});
