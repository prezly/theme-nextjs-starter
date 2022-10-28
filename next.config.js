// eslint-disable-next-line import/no-extraneous-dependencies
import NextBundleAnalyzer from '@next/bundle-analyzer';
// eslint-disable-next-line import/no-unresolved
import { localeConfig } from '@prezly/theme-kit-nextjs/localeConfig';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
    async headers() {
        return [
            {
                source: '/(.*)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: 'upgrade-insecure-requests; report-uri https://prezly.report-uri.com/r/d/csp/enforce;',
                    },
                ],
            },
        ];
    },
    images: {
        domains: ['cdn.uc.assets.prezly.com'],
    },
    eslint: {
        dirs: ['@types', 'components', 'contexts', 'hooks', 'modules', 'pages', 'utils'],
    },
    i18n: localeConfig,
});
