module.exports = {
    extends: ['@prezly', '@prezly/eslint-config/react', '@prezly/eslint-config/nextjs'],
    rules: {
        'react/jsx-props-no-spreading': [
            'error',
            {
                exceptions: ['FormattedMessage'],
            },
        ],
    },
};
