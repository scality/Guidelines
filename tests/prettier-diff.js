'use strict';

const assert = require('assert');
const { exitFromResult, filterSupportedFiles, parseArgs } = require('../bin/prettier-diff');

assert.deepStrictEqual(parseArgs([]), {
    prettierArgs: ['--check'],
    diffArgs: [],
});

assert.deepStrictEqual(parseArgs(['--format', 'HEAD~1..HEAD']), {
    prettierArgs: ['--write'],
    diffArgs: ['HEAD~1..HEAD'],
});

assert.deepStrictEqual(parseArgs(['--write', '--cached']), {
    prettierArgs: ['--write'],
    diffArgs: ['--cached'],
});

assert.deepStrictEqual(
    filterSupportedFiles([
        'index.js',
        'lib/config.cjs',
        'src/main.ts',
        'workflow.yaml',
        'README.md',
        'package-lock.json',
        'image.png',
        'script.sh',
    ]),
    ['index.js', 'lib/config.cjs', 'src/main.ts', 'workflow.yaml', 'README.md', 'package-lock.json'],
);

const originalExit = process.exit;
const originalStderrWrite = process.stderr.write;

let exitCode;
let stderr = '';

process.exit = code => {
    exitCode = code;
    throw new Error('process.exit');
};
process.stderr.write = message => {
    stderr += message;
};

assert.throws(
    () =>
        exitFromResult({
            error: new Error('spawn yarn ENOENT'),
        }),
    /process\.exit/,
);
assert.strictEqual(exitCode, 1);
assert.match(stderr, /spawn yarn ENOENT/);

process.exit = originalExit;
process.stderr.write = originalStderrWrite;
