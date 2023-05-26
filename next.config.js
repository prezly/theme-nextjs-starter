// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withPrezlyConfig = require('@prezly/theme-kit-nextjs/config')();

module.exports = withBundleAnalyzer(
    withPrezlyConfig({
        eslint: {
            dirs: ['@types', 'components', 'hooks', 'modules', 'pages', 'utils'],
        },
    }),
);
