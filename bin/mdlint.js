#!/usr/bin/env node

import { Command } from 'commander';
import { lint } from 'markdownlint/sync';

const program = new Command();

program
    .arguments('<files...>')
    .action(files => {
        const config = {
            MD004: false, // Unordered list style
            MD007: false, // Unordered list indentation
            MD024: false, // Multiple headers with the same content
            MD027: false, // Multiple spaces after blockquote symbol
            MD029: { style: 'ordered' }, // Ordered list item prefix
            MD034: false, // Bare URL used
            MD040: false, // Fenced code blocks should have a language specified
        };

        const options = {
            files,
            config,
        };

        const result = lint(options);
        const errors = result.toString();
        if (errors) {
            process.stderr.write(`${errors}\n`);
            process.exit(1);
        }
    });

program.parse(process.argv);
