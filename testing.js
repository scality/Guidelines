const globals = require('globals');

function checkFiles(helper, files) {
    if (!Array.isArray(files) || files.length === 0 || !files.every(file => typeof file === 'string')) {
        throw new TypeError(`${helper}() needs the patterns of the test files, e.g. ${helper}(['tests/**/*.js'])`);
    }
}

// The plugins are optional peer dependencies: a repository installs the one of its test runner
function loadPlugin(helper, name) {
    try {
        const plugin = require(name);
        return plugin.default || plugin;
    } catch (err) {
        throw new Error(`Install ${name} as a development dependency to use ${helper}()`, { cause: err });
    }
}

/** Config block for the test files of a repository running Mocha */
function mocha(files) {
    checkFiles('mocha', files);
    return {
        files,
        plugins: { mocha: loadPlugin('mocha', 'eslint-plugin-mocha') },
        languageOptions: { globals: globals.mocha },
        rules: {
            'mocha/no-exclusive-tests': 'error',
            'mocha/no-identical-title': 'error',
        },
    };
}

/** Config block for the test files of a repository running Jest */
function jest(files) {
    checkFiles('jest', files);
    return {
        files,
        plugins: { jest: loadPlugin('jest', 'eslint-plugin-jest') },
        languageOptions: { globals: globals.jest },
        rules: {
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
        },
    };
}

module.exports = { mocha, jest };
