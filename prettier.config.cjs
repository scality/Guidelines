module.exports = {
    tabWidth: 2,
    useTabs: false,
    printWidth: 160,
    singleQuote: true,
    quoteProps: 'consistent-as-needed',
    semi: true,
    trailingComma: 'all',
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.md'],
            options: {
                proseWrap: 'preserve',
            },
        },
    ],
};
