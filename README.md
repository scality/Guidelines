# Guidelines

This project:

* Defines and explains the coding style and workflow for the S3 project. See
  [CONTRIBUTING.md](CONTRIBUTING.md) for details.

* Provides an `eslint-config-scality` package that can be added as a dependency
  in other projects. That way, coding style can automatically be checked using
  eslint.

## Prettier baseline

This repository also provides a **baseline Prettier configuration** for Scality
object repositories: 4-space JavaScript/TypeScript indentation, 120-character
line length, single quotes, semicolons, trailing commas, and
`quoteProps: 'as-needed'`.

The configuration lives in `prettier.config.cjs`.

To use it in a project:

1. Install Prettier in the project:

   ```sh
   yarn add --dev prettier
   # or
   npm install --save-dev prettier
   ```

2. Copy or extend the configuration:

   ```js
   // prettier.config.cjs
   module.exports = require('eslint-config-scality/prettier.config.cjs');
   ```

3. Add convenience scripts:

   ```json
   {
     "scripts": {
       "format": "prettier --write .",
       "format:check": "prettier --check ."
     }
   }
   ```

Projects may override options locally (for example `tabWidth` or
`printWidth`) if they have strong legacy constraints, but this configuration
is intended to be the **default Scality baseline** for new or reformatted
Node.js codebases. YAML/JSON/Markdown files default to a 2-space indentation
and Markdown prose is left un-reflowed by default (`proseWrap: 'preserve'`),
to avoid noisy diffs in existing documentation.

## Contributing

- See `CONTRIBUTING.md` for contribution guidelines and coding standards.
- See `TESTING.md` for details on running the linters and tests in this repo.
