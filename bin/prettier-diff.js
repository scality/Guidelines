#!/usr/bin/env node

'use strict';

const { spawnSync } = require('child_process');

const supportedFilePattern = /\.(js|cjs|mjs|ts|tsx|json|ya?ml|md)$/;

function parseArgs(args) {
    const prettierArgs = [];
    const diffArgs = [];
    let hasMode = false;

    args.forEach(arg => {
        if (arg === '--format') {
            prettierArgs.push('--write');
            hasMode = true;
            return;
        }
        if (arg === '--check' || arg === '--write') {
            prettierArgs.push(arg);
            hasMode = true;
            return;
        }
        diffArgs.push(arg);
    });

    if (!hasMode) {
        prettierArgs.unshift('--check');
    }

    return { prettierArgs, diffArgs };
}

function filterSupportedFiles(files) {
    return files.filter(file => supportedFilePattern.test(file));
}

function run(command, args, options = {}) {
    return spawnSync(command, args, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        ...options,
    });
}

function exitFromResult(result) {
    if (result.error) {
        process.stderr.write(`${result.error.message}\n`);
        process.exit(1);
    }
    if (result.signal) {
        process.stderr.write(`Command terminated by signal ${result.signal}\n`);
        process.exit(1);
    }
    process.exit(result.status);
}

function getGitRoot() {
    const result = run('git', ['rev-parse', '--show-toplevel']);
    if (result.status !== 0) {
        process.stderr.write(result.stderr);
        exitFromResult(result);
    }
    return result.stdout.trim();
}

function getChangedFiles(diffArgs, cwd) {
    const result = run('git', ['diff', '--name-only', '--diff-filter=ACMRT', ...diffArgs], { cwd });
    if (result.status !== 0) {
        process.stderr.write(result.stderr);
        exitFromResult(result);
    }
    return result.stdout.split('\n').filter(Boolean);
}

function main() {
    const { prettierArgs, diffArgs } = parseArgs(process.argv.slice(2));
    const rootDir = getGitRoot();
    const changedFiles = filterSupportedFiles(getChangedFiles(diffArgs, rootDir));

    if (changedFiles.length === 0) {
        process.stdout.write('No supported files changed; skipping Prettier.\n');
        return;
    }

    process.stdout.write(`Running Prettier on ${changedFiles.length} file(s):\n`);
    changedFiles.forEach(file => process.stdout.write(` - ${file}\n`));

    const result = spawnSync(
        'yarn',
        ['run', '--silent', 'prettier', ...changedFiles, ...prettierArgs],
        { cwd: rootDir, stdio: 'inherit' },
    );
    exitFromResult(result);
}

if (require.main === module) {
    main();
}

module.exports = {
    exitFromResult,
    filterSupportedFiles,
    main,
    parseArgs,
};
