module.exports = {
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    singleQuote: true,
    quoteProps: 'as-needed',
    semi: true,
    trailingComma: 'all',
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.yml', '*.yaml'],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ['*.md'],
            options: {
                proseWrap: 'preserve',
            },
        },
    ],
};
