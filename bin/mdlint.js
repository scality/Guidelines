#!/usr/bin/env node

"use strict";

const commander = require("commander");
const markdownlint = require("markdownlint");

const files = commander.parse(process.argv).args;

// See rules at https://github.com/mivok/markdownlint/blob/master/docs/RULES.md
const config = {
    "MD004": false,
    "MD027": false,
    "MD034": false,
    "MD040": false,
};

const result = markdownlint.sync({ files: files, config: config });
const errors = result.toString();
if (errors) {
    process.stderr.write(errors + "\n");
    process.exit(1);
}
